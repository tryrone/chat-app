import React from "react";
import Colors from "../constants/Colors";
import CardSafeAreaWrap from "../components/SafeAreaWrap/cardSafeArea";
import styled from "styled-components/native";
import { pattern_bg, peopleImage } from "../../assets/images";
import CustomText from "../components/CustomText";
import Fonts from "../constants/Fonts";
import { Safe_Icon } from "../../assets/svgs";
import Button from "../components/Button";
import { ScreenDefaultProps } from "../constants/types";

const PeopleImage = styled.Image`
  height: 300px;
  width: 95%;
  align-self: center;
  margin-top: 60px;
`;

const PatternBg = styled.ImageBackground``;

const BlackContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${Colors?.black};
  padding-horizontal: 30px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

const Welcome = ({ navigation }: ScreenDefaultProps): JSX.Element => {
  return (
    <CardSafeAreaWrap bg={Colors?.primary} safeAreaBg={Colors?.primary}>
      <PatternBg source={pattern_bg} resizeMode="cover">
        <PeopleImage source={peopleImage} resizeMode="cover" />
      </PatternBg>
      <BlackContainer>
        <CustomText
          top={40}
          fontSize={36}
          fontWeight="700"
          fontFamily={Fonts?.InterBold}
          color={Colors?.white}
        >
          Stay connected with your friends and family
        </CustomText>

        <Row>
          <Safe_Icon />
          <CustomText
            left={9}
            fontFamily={Fonts?.InterMedium}
            fontSize={16}
            color={Colors?.white}
            fontWeight="700"
          >
            Secure, private messaging
          </CustomText>
        </Row>

        <Button
          text="Get Started"
          style={{ marginTop: 40 }}
          fontWeight="700"
          height="64px"
          borderRadius="100px"
          fontFamily={Fonts?.InterBold}
          textColor={Colors?.black}
          bgColor={Colors?.white}
          onPress={() => {
            navigation?.navigate("Dashboard");
          }}
        />
      </BlackContainer>
    </CardSafeAreaWrap>
  );
};

export default Welcome;
