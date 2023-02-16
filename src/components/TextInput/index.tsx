/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardTypeOptions,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import styled from "styled-components/native";
import {
  ActivePassword,
  HidePassword,
  SelectIconSvg,
} from "../../../assets/svgs";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import CustomText from "../CustomText";
import RNPickerSelect from "react-native-picker-select";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Wrapper = styled.View<{
  width?: number;
  active?: boolean;
  marginTop?: number;
}>`
  height: 56px;
  width: ${(props) => props?.width || 100}%;
  border-width: 2px;
  border-color: ${(props) =>
    props?.active ? "rgba(18,0,55, 0.6)" : Colors?.border};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props?.marginTop || 0}px;
  padding-horizontal: 12px;
  z-index: 4;
`;

const DisabledView = styled.Pressable<{
  width?: number;
  marginTop?: number;
}>`
  height: 56px;
  width: ${(props) => props?.width || 100}%;
  margin-top: ${(props) => props?.marginTop || 0}px;
  z-index: 6;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
`;

const TextWrap: any = styled.TextInput`
  height: 100%;
  width: 100%;
  font-family: ${Fonts?.InterRegular};
  font-size: 14px;
  font-weight: 400;
  color: ${Colors?.black};
  align-items: center;
`;

const ViewWrap = styled.View<{
  width?: string;
  top?: number;
  bottom?: number;
  viewStyle?: {};
}>`
  position: relative;
  width: ${({ width }) => width || "100%"};
  margin-top: ${({ top }) => top}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
  ${({ viewStyle }) => viewStyle};
`;

const InputWithIcon = styled.Pressable<{
  bgColor: string;
  borderColor: string;
  active: boolean;
}>`
  flex-direction: row;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  padding-horizontal: 16px;
  height: 55px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${(props) =>
    props?.active ? "rgba(18,0,55, 0.6)" : Colors?.border};
  justify-content: space-between;
  align-items: center;
`;

const DropDownContent = styled.View`
  width: 80%;
`;

const PasswordInput = styled.TextInput<{
  width?: string;
}>`
  width: ${({ width }) => width || "100%"};
  color: ${Colors?.black}
  height: 52px;
  font-weight: 400;
  text-align: left;
  justify-content: center;
  font-size: 12px;
`;

type TextInputProps = {
  marginTop?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  inputType?: KeyboardTypeOptions;
  returnValue?: boolean;
  handleChange?: ((e: string) => void) | undefined;
  name?: string;
  errors?: string;
  value: string;
  showNaira?: boolean;
  onWrapPress?: ((e: boolean) => void) | undefined;
  disabled?: boolean;
};

const TextInput = ({
  marginTop = 0,
  placeholder = "",
  placeholderTextColor = Colors.greyPlaceholderTextColor,
  inputType = "default",
  returnValue = false,
  handleChange = () => {},
  name = "",
  errors = "",
  value,
  showNaira = false,
  onWrapPress,
  disabled,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  const translateY = useSharedValue(value ? 18 : 40);
  const animatedIndex = useSharedValue(value ? 5 : 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      zIndex: animatedIndex?.value,
    };
  });

  useEffect(() => {
    if (focused) {
      translateY.value = withTiming(18);
      animatedIndex.value = withTiming(5);
    }
  }, [focused, translateY, animatedIndex]);

  useEffect(() => {
    if (errors.length > 0) {
      setFocused(false);
    }
  }, [errors]);

  return (
    <Pressable>
      {disabled && (
        <DisabledView
          onPress={() => {
            onWrapPress && onWrapPress(true);
          }}
          marginTop={marginTop}
        />
      )}

      <Animated.View style={[animatedStyles, { zIndex: animatedIndex?.value }]}>
        <CustomText
          style={{
            zIndex: 3,
            backgroundColor: "white",
            alignSelf: "flex-start",
            paddingHorizontal: 6,
            marginLeft: 9,
          }}
          fontFamily={Fonts.InterMedium}
          bottom={4}
          fontSize={14}
          fontWeight="600"
          color={focused ? Colors?.black : placeholderTextColor}
        >
          {placeholder}
        </CustomText>
      </Animated.View>

      <Wrapper active={focused}>
        {showNaira && (
          <CustomText
            color={Colors.grey_2}
            align="left"
            right={5}
            fontWeight="800"
            fontSize={14}
            fontFamily={Fonts.InterBold}
          >
            ₦
          </CustomText>
        )}

        <TextWrap
          placeholder={""}
          keyboardType={inputType}
          onChangeText={
            returnValue
              ? (e: string) => {
                  handleChange(e);
                }
              : handleChange(name)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
          }}
          value={value}
        />
      </Wrapper>
      {errors.length > 0 && (
        <View>
          <CustomText
            fontWeight="500"
            top={4}
            left={5}
            fontFamily={Fonts?.InterMedium}
            fontSize={13}
            color={Colors.error}
          >
            {errors}
          </CustomText>
        </View>
      )}
    </Pressable>
  );
};

type PasswordProps = {
  bgColor?: string;
  placeholder: string;
  placeholderTextColor?: string;
  handleChange?: ((e: string) => void) | undefined;
  name?: string;
  value: string;
  disabled?: boolean;
  errors?: string;
  marginTop?: number;
  style?: ViewStyle;
  setFieldTouched?: ((e: any) => void) | undefined;
};

export const Password = ({
  bgColor = "rgba(0,0,0,0)",
  placeholder,
  placeholderTextColor = Colors.greyPlaceholderTextColor,
  handleChange = () => {},
  name = "",
  value,
  disabled = false,
  errors = "",
  marginTop = 0,
  style,
  setFieldTouched = () => {},
}: PasswordProps) => {
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);

  const translateY = useSharedValue(45);
  const animatedIndex = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      zIndex: animatedIndex?.value,
    };
  });

  useEffect(() => {
    if (focused) {
      translateY.value = withTiming(18);
      animatedIndex.value = withTiming(3);
    }
  }, [focused, translateY, animatedIndex]);

  useEffect(() => {
    if (errors.length > 0) {
      setFocused(false);
    }
  }, [errors]);

  return (
    <ViewWrap
      bottom={errors.length > 0 ? 16 : 0}
      top={marginTop}
      style={style}
      width="100%"
    >
      <Animated.View style={[animatedStyles, { zIndex: animatedIndex?.value }]}>
        <CustomText
          style={{
            zIndex: 3,
            backgroundColor: "white",
            alignSelf: "flex-start",
            paddingHorizontal: 6,
            marginLeft: 9,
          }}
          fontFamily={Fonts.InterMedium}
          bottom={4}
          fontSize={14}
          fontWeight="600"
          color={focused ? Colors?.black : placeholderTextColor}
        >
          {placeholder}
        </CustomText>
      </Animated.View>

      <InputWithIcon
        active={focused}
        borderColor={focused ? Colors.primary : Colors.inputGreyBg}
        bgColor={bgColor}
      >
        <PasswordInput
          onChangeText={handleChange(name)}
          autoCapitalize={"none"}
          width="80%"
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setFieldTouched(name);
          }}
          secureTextEntry={!hidden}
          value={value}
          editable={!disabled}
        />
        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          {hidden ? <ActivePassword /> : <HidePassword />}
        </TouchableOpacity>
      </InputWithIcon>
      {errors.length > 0 && (
        <View>
          <CustomText
            fontWeight="500"
            top={3}
            left={5}
            fontFamily={Fonts?.InterMedium}
            fontSize={13}
            color={Colors.error}
          >
            {errors}
          </CustomText>
        </View>
      )}
    </ViewWrap>
  );
};

interface ValueLabel {
  value: string;
  label: string;
}

type DropDownProp = {
  bgColor?: string;
  top?: number;
  value: string;
  pickerItems?: ValueLabel[];
  onValueChange?: ((res: string) => void) | undefined;
  placeholder?: string;
  errors?: string;
  style?: ViewStyle;
  showChevron?: boolean;
  width?: string;
};

export class PickerSelect extends React.Component {
  pickerRef = React.createRef<any>();

  openPicker() {
    if (Platform.OS === "android") {
      this.pickerRef.current.focus();
    } else {
      this.pickerRef.current.togglePicker(true);
    }
  }

  render() {
    const { onValueChange, items, value, onClose, placeholder, onOpen }: any =
      this.props;
    return (
      <RNPickerSelect
        placeholder={placeholder}
        onValueChange={onValueChange}
        onClose={onClose}
        items={items}
        onOpen={onOpen}
        style={{
          viewContainer: {
            height: 0,
            position: "absolute",
            width: 0,
            opacity: 0,
            top: -1000,
          },
          inputAndroid: { color: "black", opacity: 0 },
        }}
        ref={Platform.OS === "ios" ? this.pickerRef : null}
        pickerProps={{ ref: Platform.OS === "android" ? this.pickerRef : null }}
        value={value}
        useNativeAndroidPickerStyle={false}
      />
    );
  }
}

export const DropDown = ({
  bgColor = Colors.inputGreyBg,
  top = 0,
  value = "",
  pickerItems = [],
  onValueChange = () => {},
  placeholder = "Select",
  errors = "",
  style = {},
  showChevron = true,
  width = "100%",
}: DropDownProp) => {
  const pickerRef = useRef<any>();
  const [selectedValue, setSelectedValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const onOpenPicker = () => {
    pickerRef?.current?.openPicker();
  };

  useEffect(() => {
    const newSelected: any = pickerItems.find((item) => item.value === value);
    setSelected(newSelected);
  }, [value, pickerItems]);

  return (
    <ViewWrap
      bottom={errors && errors.length > 0 ? 16 : 0}
      top={top}
      style={style}
      width={width}
    >
      <InputWithIcon
        onPress={placeholder === "Default" ? null : onOpenPicker}
        borderColor={focused ? Colors.primary : Colors.inputGreyBg}
        bgColor={bgColor}
      >
        <DropDownContent>
          <CustomText
            color={
              !selected?.value && value.length === 0
                ? Colors.greyPlaceholderTextColor
                : Colors.black
            }
            style={{
              position: "relative",
              top: Platform.OS === "android" ? 24 : 0,
            }}
            align="left"
            fontWeight="400"
            fontSize={12}
            fontFamily={Fonts?.InterRegular}
          >
            {!selected?.value && value.length === 0
              ? placeholder
              : selected?.value || value}
          </CustomText>
          <PickerSelect
            ref={pickerRef}
            placeholder={{ value: null, label: placeholder }}
            onValueChange={(val: any) => {
              if (!val) {
                return;
              }
              setSelectedValue(val);
              if (Platform.OS === "android") {
                onValueChange(val);
              }
              setFocused(false);
            }}
            onClose={() => {
              onValueChange(selectedValue);
              setFocused(false);
            }}
            onOpen={() => {
              setFocused(true);
            }}
            value={selectedValue}
            items={pickerItems}
          />
        </DropDownContent>

        {showChevron && <SelectIconSvg />}
      </InputWithIcon>
      {errors.length > 0 && (
        <CustomText
          fontWeight="400"
          style={{
            bottom: Platform.OS === "android" ? -20 : -22,
            position: "absolute",
            fontSize: 12,
          }}
          color={Colors.error}
        >
          {errors}
        </CustomText>
      )}
    </ViewWrap>
  );
};

export default TextInput;
