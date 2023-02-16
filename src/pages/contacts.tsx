import { View, Text } from "react-native";
import React from "react";
import { ScreenDefaultProps } from "../constants/types";
import SafeAreaWrap from "../components/SafeAreaWrap";

const Contacts = ({ navigation }: ScreenDefaultProps) => {
  return (
    <SafeAreaWrap>
      <Text>Contacts</Text>
    </SafeAreaWrap>
  );
};

export default Contacts;
