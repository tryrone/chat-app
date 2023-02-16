import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { MicSvg, Small_add } from "../../../assets/svgs";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import { socket, UserObject } from "../../pages/messages";
import CustomText from "../CustomText";

const InputWrap = styled.View`
  min-height: 64px;
  width: 100%;
  border: 1px solid ${Colors?.input_border};
  border-radius: 164px;
  padding: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputText = styled.TextInput`
  min-height: 28px;
  border-right-width: 1px;
  border-right-color: ${Colors?.input_border};
  font-family: ${Fonts?.InterRegular}
  font-size: 14px;
  font-weight: 400;
  width:70%;
  margin-right: 14px;
  margin-left: 12px;
`;

const ChatContainer = styled.View`
  height: 90%;
  width: 100%;
  justify-content: flex-end;
`;

const BubbleContainer = styled.Pressable<{
  iAmSender: boolean;
}>`
  align-items: ${({ iAmSender }) => (iAmSender ? "flex-end" : "flex-start")};
`;

const BubbleWrap = styled.View<{
  iAmSender: boolean;
}>`
  padding-vertical: 12px;
  padding-horizontal: 20px;
  border-radius: 100px;
  background-color: ${({ iAmSender }) =>
    iAmSender ? Colors?.orange : Colors?.yellow};
  max-width: 80%;
  margin-bottom: 9px;
`;

type ChatItemProp = {
  item: {
    text: string;
    iAmSender: boolean;
    time: string;
  };
  index: number;
};

type SameSenderProp = {
  currentMessage: {
    text: string;
    iAmSender: boolean;
    time: string;
  };
  prevMessage?: {
    text: string;
    iAmSender: boolean;
    time: string;
  };
};

type NextSenderProp = {
  currentMessage: {
    text: string;
    iAmSender: boolean;
    time: string;
  };
  nextMessage?: {
    text: string;
    iAmSender: boolean;
    time: string;
  };
};

const isSenderSame = ({
  currentMessage,
  prevMessage,
}: SameSenderProp): boolean => {
  return currentMessage.time === (prevMessage?.time || "");
};

const isNextSenderSame = ({
  currentMessage,
  nextMessage,
}: NextSenderProp): boolean => {
  return currentMessage.time === (nextMessage?.time || "");
};

type ChatItemData = {
  text: string;
  iAmSender: boolean;
  time: string;
  date: Date | number;
};

type ChatData = {
  user: UserObject;
};

const Chat = ({ user }: ChatData) => {
  const [chatText, setChatText] = useState("");
  const [chatData, setChatData] = useState<Array<ChatItemData>>([]);
  const flatlistRef = useRef<any>();

  const updateChat = (message: ChatItemData) => {
    const textAlreadyExists = chatData.find(
      (item) => item.text === message.text && item.time === message.time
    );

    if (textAlreadyExists || message?.text.length === 0) return;
    setChatText("");
    setChatData([...chatData, message]);
    chatData.push(message);
  };

  const updateChatBubbles = (message: ChatItemData, from: string) => {
    if (user.userID === from) {
      setChatData([...chatData, { ...message, iAmSender: false }]);
      chatData.push({ ...message, iAmSender: false });
    }
  };

  useEffect(() => {
    socket.on("private message", ({ content, from }) => {
      updateChatBubbles(content, from);
    });
  }, []);

  const onSubmit = () => {
    const msgData = {
      text: chatText,
      time: moment(Date.now()).format("hh:mm A"),
      date: Date.now(),
    };

    if (user) {
      socket.emit("private message", {
        content: msgData,
        to: user?.userID,
      });
    }
    updateChat({ ...msgData, iAmSender: true });
  };

  const renderItem = ({ item, index }: ChatItemProp): JSX.Element => {
    const iAmSender = item?.iAmSender;
    const previousTimeIsSame = isSenderSame({
      currentMessage: item,
      prevMessage: chatData[index - 1],
    });

    const nextTimeIsSame = isNextSenderSame({
      currentMessage: item,
      nextMessage: chatData[index + 1],
    });

    return (
      <BubbleContainer iAmSender={iAmSender}>
        <BubbleWrap iAmSender={iAmSender}>
          <CustomText
            align={iAmSender ? "right" : "left"}
            fontFamily={Fonts?.InterRegular}
            fontSize={15}
            lineHeight={20}
            fontWeight="400"
          >
            {item?.text}
          </CustomText>
        </BubbleWrap>

        {previousTimeIsSame && !nextTimeIsSame && (
          <CustomText
            align={iAmSender ? "right" : "left"}
            fontFamily={Fonts?.InterRegular}
            fontSize={12}
            top={10}
            bottom={5}
            color={Colors?.timeColor}
            fontWeight="400"
          >
            {item?.time}
          </CustomText>
        )}

        {!previousTimeIsSame && !nextTimeIsSame && (
          <CustomText
            align={iAmSender ? "right" : "left"}
            fontFamily={Fonts?.InterRegular}
            fontSize={12}
            top={10}
            bottom={5}
            color={Colors?.timeColor}
            fontWeight="400"
          >
            {item?.time}
          </CustomText>
        )}
      </BubbleContainer>
    );
  };
  return (
    <ChatContainer>
      <FlatList
        ref={flatlistRef}
        showsVerticalScrollIndicator={false}
        data={chatData}
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatlistRef.current?.scrollToIndex({
              index: 0,
              animated: true,
            });
          });
        }}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index} + ${Date.now()}`}
        extraData={chatData}
      />

      <InputWrap>
        <Small_add />
        <InputText
          value={chatText}
          onChangeText={(e) => setChatText(e)}
          multiline
          placeholder="Type Message..."
        />
        <TouchableOpacity onPress={() => onSubmit()}>
          <MicSvg />
        </TouchableOpacity>
      </InputWrap>
    </ChatContainer>
  );
};

export default Chat;
