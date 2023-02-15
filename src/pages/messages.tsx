import { ImageBackground, StatusBar } from "react-native";
import React from "react";
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

export const socket = io("http://localhost:3000");

const Messages = ({ navigation }: ScreenDefaultProps) => {
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
        <ChatlistItem navigation={navigation} />
      </ChatlistContainer>
    </CardSafeAreaWrap>
  );
};

export default Messages;
