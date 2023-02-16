import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import {
  Big_Add_Btn,
  CallIcon,
  ChatIcon,
  ProfileIcon,
  SearchIcon,
} from "../../assets/svgs";
import Messages from "./messages";
import Contacts from "./contacts";

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
  const AddUser = (): JSX.Element => <></>;
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
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: ({ focused }) =>
            RenderComponentLabel({ focused, text: "Contacts" }),
          tabBarIcon: ({ focused }) =>
            RenderComponetIcon({
              focused,
              activeIcon: <CallIcon />,
              inacitveIcon: <CallIcon />,
            }),
        }}
      />

      <Tab.Screen
        name="AddUser"
        component={AddUser}
        options={{
          tabBarLabel: ({ focused }) =>
            RenderComponentLabel({ focused, text: "" }),
          tabBarIcon: ({ focused }) =>
            RenderComponetIcon({
              focused,
              activeIcon: (
                <Big_Add_Btn style={{ position: "relative", bottom: 15 }} />
              ),
              inacitveIcon: (
                <Big_Add_Btn style={{ position: "relative", bottom: 15 }} />
              ),
            }),
          tabBarShowLabel: false,
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
