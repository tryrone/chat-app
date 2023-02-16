import { FlatList, ImageBackground, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import CardSafeAreaWrap from "../components/SafeAreaWrap/cardSafeArea";
import { pattern_bg_2 } from "../../assets/images";
import CustomText from "../components/CustomText";
import Fonts from "../constants/Fonts";
import styled from "styled-components/native";
import Stories from "../components/Stories/stories";
import ChatlistItem from "../components/ChatlistItem";
import { ScreenDefaultProps } from "../constants/types";
import { io } from "socket.io-client";

const TextWrap = styled.View`
  padding-horizontal: 20px;
  padding-top: 30px;
`;

const ChatlistContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${Colors?.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 20px;
`;

export const socket = io("http://localhost:3000", { autoConnect: false });

export type UserObject = {
  hasNewMessages: boolean;
  self: boolean;
  userID: string;
  username: string;
};

const Messages = ({ navigation }: ScreenDefaultProps) => {
  const [loggedInuser, setLoggedInUser] = useState({});
  const [currentUsers, setCurrentUsers] = useState<UserObject[]>([]);

  const initReactiveProperties = (user) => {
    user.hasNewMessages = false;
    setLoggedInUser(user);
  };

  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }, []);

  useEffect(() => {
    socket.on("user connected", (user) => {
      if (user.userID !== socket.id) setCurrentUsers([...currentUsers, user]);
    });
  }, []);

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });
      // put the current user first, and then sort by username
      const newCurrentUsers = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      setCurrentUsers(newCurrentUsers);
    });
  }, []);

  type ChatListItemProp = {
    item: UserObject;
    index: number;
  };

  const renderChatListItem = ({ item, index }: ChatListItemProp) => {
    return <ChatlistItem navigation={navigation} user={item} key={index} />;
  };

  const filteredUsers = currentUsers.filter(
    (user) => user.userID !== socket.id
  );

  return (
    <CardSafeAreaWrap
      source={pattern_bg_2}
      bg={Colors?.black}
      safeAreaBg={Colors?.black}
    >
      <ImageBackground source={pattern_bg_2} resizeMode="cover">
        <StatusBar barStyle="light-content" />
        <TextWrap>
          <CustomText
            fontSize={20}
            fontWeight="300"
            color={Colors?.white}
            fontFamily={Fonts?.InterRegular}
          >
            Welcome back,{" "}
            <CustomText
              fontSize={20}
              fontWeight="700"
              color={Colors?.white}
              fontFamily={Fonts?.InterBold}
            >
              Jayesh
            </CustomText>
          </CustomText>
        </TextWrap>
        <Stories />
      </ImageBackground>
      <ChatlistContainer>
        <FlatList
          data={filteredUsers}
          renderItem={renderChatListItem}
          extraData={filteredUsers}
        />
      </ChatlistContainer>
    </CardSafeAreaWrap>
  );
};

export default Messages;
