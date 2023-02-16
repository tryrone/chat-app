import React, { useState } from "react";
import Button from "../components/Button";
import CustomText from "../components/CustomText";
import SafeAreaWrap from "../components/SafeAreaWrap";
import TextInput from "../components/TextInput";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { ScreenDefaultProps } from "../constants/types";
import { storeData } from "../utils";
import { socket } from "./messages";

const CreateAccount = ({ navigation }: ScreenDefaultProps): JSX.Element => {
  const [loginData, setLoginData] = useState({
    userName: "Player1",
    email: "Player1@gmail.com",
  });

  const [loginDataError, setLoginDataError] = useState({
    userName: "",
    email: "",
  });

  const Submit = async () => {
    if (loginData?.email.length === 0) {
      setLoginDataError({
        ...loginDataError,
        userName: "",
      });
      return setLoginDataError({
        ...loginDataError,
        email: "Email is required!",
      });
    }
    if (loginData?.userName.length === 0) {
      setLoginDataError({
        ...loginDataError,
        email: "",
      });
      return setLoginDataError({
        ...loginDataError,
        userName: "UserName is required!",
      });
    }

    await storeData("userData", loginData);

    socket.auth = { username: loginData?.userName };
    socket.connect();

    navigation?.navigate("Dashboard");
  };

  return (
    <SafeAreaWrap style={{ paddingHorizontal: 20 }}>
      <CustomText
        top={54}
        fontFamily={Fonts?.InterBold}
        fontSize={30}
        fontWeight="800"
      >
        Access Application
      </CustomText>

      <CustomText
        fontFamily={Fonts?.InterRegular}
        fontSize={16}
        top={13}
        color="rgba(0, 0, 0, 0.7)"
      >
        Please provide the following details to have access to the application
      </CustomText>

      <TextInput
        value={loginData?.userName}
        placeholder="Username"
        marginTop={38}
        returnValue
        handleChange={(val: string) =>
          setLoginData({ ...loginData, userName: val })
        }
        errors={loginDataError?.userName}
      />

      <TextInput
        value={loginData?.email}
        placeholder="Email"
        marginTop={22}
        returnValue
        handleChange={(val: string) =>
          setLoginData({ ...loginData, email: val })
        }
        errors={loginDataError?.email}
      />

      <Button
        text="Log in"
        bgColor={Colors?.black}
        borderRadius="10px"
        textColor={Colors?.white}
        fontWeight="600"
        fontFamily={Fonts?.InterBold}
        textSize={16}
        style={{ marginTop: 39 }}
        onPress={() => Submit()}
      />
    </SafeAreaWrap>
  );
};

export default CreateAccount;
