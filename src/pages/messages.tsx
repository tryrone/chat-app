import { StatusBar, Text } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import CardSafeAreaWrap from "../components/SafeAreaWrap/cardSafeArea";
import { pattern_bg_2 } from "../../assets/images";
import CustomText from "../components/CustomText";
import Fonts from "../constants/Fonts";
import styled from "styled-components/native";
import Stories from "../components/Stories/stories";

const TextWrap = styled.View`
  padding-horizontal: 20px;
  padding-top: 50px;
`;

const Messages = () => {
  return (
    <CardSafeAreaWrap
      source={pattern_bg_2}
      bg={Colors?.black}
      safeAreaBg={Colors?.black}
    >
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
    </CardSafeAreaWrap>
  );
};

export default Messages;
