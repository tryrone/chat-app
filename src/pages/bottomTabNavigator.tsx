import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { CallIcon, ChatIcon, ProfileIcon, SearchIcon } from "../../assets/svgs";
import Messages from "./messages";

const Tab = createBottomTabNavigator();

type ComponentLabelProps = {
  focused: boolean;
  text: string;
};

const RenderComponentLabel = ({
  focused,
  text,
}: ComponentLabelProps): JSX.Element => {
  return (
    <CustomText
      color={focused ? Colors?.black : Colors?.inactiveIcon}
      fontWeight="600"
      fontFamily={Fonts?.InterBold}
      fontSize={12}
    >
      {text}
    </CustomText>
  );
};

type ComponentIconProps = {
  focused: boolean;
  activeIcon: JSX.Element;
  inacitveIcon: JSX.Element;
};

const RenderComponetIcon = ({
  focused,
  activeIcon,
  inacitveIcon,
}: ComponentIconProps): JSX.Element => {
  return focused ? activeIcon : inacitveIcon;
};

const BottomTabNavigator = () => {
  const Calls = (): JSX.Element => <></>;
  const Search = (): JSX.Element => <></>;
  const Profile = (): JSX.Element => <></>;

  return (
    <Tab.Navigator
      initialRouteName="Messages"
      backBehavior="history"
      screenOptions={{
        lazy: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: ({ focused }) =>
            RenderComponentLabel({ focused, text: "Messages" }),
          tabBarIcon: ({ focused }) =>
            RenderComponetIcon({
              focused,
              activeIcon: <ChatIcon />,
              inacitveIcon: <ChatIcon />,
            }),
        }}
      />

      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{
          tabBarLabel: ({ focused }) =>
            RenderComponentLabel({ focused, text: "Calls" }),
          tabBarIcon: ({ focused }) =>
            RenderComponetIcon({
              focused,
              activeIcon: <CallIcon />,
              inacitveIcon: <CallIcon />,
            }),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: ({ focused }) =>
            RenderComponentLabel({ focused, text: "Search" }),
          tabBarIcon: ({ focused }) =>
            RenderComponetIcon({
              focused,
              activeIcon: <SearchIcon />,
              inacitveIcon: <SearchIcon />,
            }),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) =>
            RenderComponentLabel({ focused, text: "Profile" }),
          tabBarIcon: ({ focused }) =>
            RenderComponetIcon({
              focused,
              activeIcon: <ProfileIcon />,
              inacitveIcon: <ProfileIcon />,
            }),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
