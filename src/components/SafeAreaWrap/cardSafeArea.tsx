/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import { pattern_bg } from "../../../assets/images";

const ImageBackgroundCard = styled.ImageBackground<{ bgColor?: string }>`
  flex: 1;
  background-color: ${({ bgColor }) => bgColor || Colors?.white};
  height: 200px;
`;

type SafeAreaProp = {
  children: React.ReactNode;
  style?: ViewStyle;
  bg?: string;
  height?: string;
  width?: string;
  safeAreaBg?: string;
  source?: ImageSourcePropType;
};

const CardSafeAreaWrap = ({
  children,
  style,
  bg = Colors.white,
  height = "100%",
  width = "100%",
  safeAreaBg = Colors.white,
  source = pattern_bg,
}: SafeAreaProp): JSX.Element => {
  return (
    <ImageBackgroundCard
      bgColor={safeAreaBg}
      source={source}
      resizeMode="cover"
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: bg,
            height,
            width,
            ...style,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </ImageBackgroundCard>
  );
};

export default CardSafeAreaWrap;
