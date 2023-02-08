import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { MicSvg, Small_add } from "../../../assets/svgs";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import CustomText from "../CustomText";

const bubbleData = [
  {
    text: "Hey! How have you been?",
    iAmSender: false,
    time: "12:15 PM",
  },
  {
    text: "Wanna catch up for a beer?",
    iAmSender: false,
    time: "12:15 PM",
  },
  {
    text: "Awesome! Let’s meet up",
    iAmSender: true,
    time: "12:20 PM",
  },
  {
    text: "Can I also get my cousin along? Will that be okay?",
    iAmSender: true,
    time: "12:20 PM",
  },
  {
    text: "Yeah sure! get him too.",
    iAmSender: false,
    time: "12:22 PM",
  },
  {
    text: "Alright! See you soon!",
    iAmSender: true,
    time: "12:25 PM",
  },
  {
    text: "Remember to bring the thing",
    iAmSender: false,
    time: "12:26 PM",
  },
  {
    text: "Okay sure!",
    iAmSender: true,
    time: "12:28 PM",
  },
];

const InputWrap = styled.View`
  height: 64px;
  width: 100%;
  border: 1px solid ${Colors?.input_border};
  border-radius: 164px;
  padding: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputText = styled.TextInput`
  height: 33px;
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
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 100px;
  background-color: ${({ iAmSender }) =>
    iAmSender ? Colors?.orange : Colors?.yellow};
  max-width: 80%;
  margin-bottom: 6px;
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

const renderItem = ({ item, index }: ChatItemProp): JSX.Element => {
  const iAmSender = item?.iAmSender;
  const previousTimeIsSame = isSenderSame({
    currentMessage: item,
    prevMessage: bubbleData[index - 1],
  });

  const nextTimeIsSame = isNextSenderSame({
    currentMessage: item,
    nextMessage: bubbleData[index + 1],
  });

  return (
    <BubbleContainer iAmSender={iAmSender}>
      <BubbleWrap iAmSender={iAmSender}>
        <CustomText
          align={iAmSender ? "right" : "left"}
          fontFamily={Fonts?.InterRegular}
          fontSize={15}
          style={{ lineHeight: 20 }}
          fontWeight="400"
        >
          {item?.text}
        </CustomText>
      </BubbleWrap>

      {previousTimeIsSame && (
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

const Chat = () => {
  return (
    <ChatContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bubbleData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index} + ${Date.now()}`}
      />

      <InputWrap>
        <Small_add />
        <InputText placeholder="Type Message..." />
        <MicSvg />
      </InputWrap>
    </ChatContainer>
  );
};

export default Chat;
