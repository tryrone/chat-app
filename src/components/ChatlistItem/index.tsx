import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SeenIcon } from "../../../assets/svgs";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import { ScreenDefaultProps } from "../../constants/types";
import CustomText from "../CustomText";

const Wrapper = styled.TouchableOpacity`
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors?.grey_border};
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  height: 59px;
  width: 59px;
  border-radius: ${59 / 2}px;
  margin-right: 20px;
`;

interface ChatItemProps {
  navigation: {
    navigate?: (val: string) => void;
  };
}

const ChatlistItem = ({ navigation }: ChatItemProps) => {
  return (
    <Wrapper onPress={() => navigation?.navigate("ChatDetail")}>
      <Row>
        <ProfileImage
          source={{
            uri: "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1183&q=80",
          }}
          resizeMode="cover"
        />
        <View>
          <CustomText
            fontSize={15}
            fontWeight="700"
            fontFamily={Fonts.InterMedium}
          >
            Pranav Ray
          </CustomText>
          <CustomText
            fontSize={14}
            top={4}
            fontWeight="500"
            fontFamily={Fonts.InterRegular}
            color={Colors?.inactiveIcon}
          >
            okay sure!!
          </CustomText>
        </View>
      </Row>

      <View>
        <CustomText
          fontSize={12}
          fontWeight="500"
          bottom={7}
          fontFamily={Fonts.InterRegular}
          color={Colors?.inactiveIcon}
        >
          12:25 PM
        </CustomText>
        <SeenIcon style={{ alignSelf: "flex-end" }} />
      </View>
    </Wrapper>
  );
};

export default ChatlistItem;
