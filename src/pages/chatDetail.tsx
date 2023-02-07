import { ImageBackground, StatusBar, View } from "react-native";
import { pattern_bg_2 } from "../../assets/images";
import CardSafeAreaWrap from "../components/SafeAreaWrap/cardSafeArea";
import Colors from "../constants/Colors";
import styled from "styled-components/native";
import CustomText from "../components/CustomText";
import Fonts from "../constants/Fonts";
import { Dots } from "../../assets/svgs";
import Chat from "../components/ChatlistItem/Chat";
import KeyboardShift from "../components/KeyboardAvoidView";

const TextWrap = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: ${42 / 2}px;
  margin-right: 13px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChatContainer = styled.View`
  height: 100%;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${Colors?.white};
  padding: 20px;
`;

const ChatDetail = () => {
  return (
    <KeyboardShift>
      <CardSafeAreaWrap
        source={pattern_bg_2}
        bg={Colors?.black}
        safeAreaBg={Colors?.black}
      >
        <ImageBackground source={pattern_bg_2} resizeMode="cover">
          <StatusBar barStyle="light-content" />
          <TextWrap>
            <Row>
              <ProfileImage
                source={{
                  uri: "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1183&q=80",
                }}
                resizeMode="cover"
              />
              <View>
                <CustomText
                  fontSize={16}
                  fontWeight="700"
                  color={Colors?.white}
                  fontFamily={Fonts?.InterMedium}
                >
                  Pranav Ray
                </CustomText>
                <CustomText
                  fontSize={14}
                  top={2}
                  fontWeight="400"
                  color={Colors?.white}
                  fontFamily={Fonts?.InterRegular}
                >
                  Online
                </CustomText>
              </View>
            </Row>

            <Dots />
          </TextWrap>
        </ImageBackground>
        <ChatContainer>
          <Chat />
        </ChatContainer>
      </CardSafeAreaWrap>
    </KeyboardShift>
  );
};

export default ChatDetail;
