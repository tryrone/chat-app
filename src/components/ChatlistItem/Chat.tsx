import React from "react";
import styled from "styled-components/native";
import { MicSvg, Small_add } from "../../../assets/svgs";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

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

const Chat = () => {
  return (
    <ChatContainer>
      <InputWrap>
        <Small_add />
        <InputText placeholder="Type Message..." />
        <MicSvg />
      </InputWrap>
    </ChatContainer>
  );
};

export default Chat;
