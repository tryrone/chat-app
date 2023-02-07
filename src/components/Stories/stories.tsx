import { View, Text, FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import { Black_add_svg } from "../../../assets/svgs";
import CustomText from "../CustomText";
import Fonts from "../../constants/Fonts";

const AddWrap = styled.View`
  height: 59px;
  width: 59px;
  border-radius: ${59 / 2}px;
  background-color: ${Colors?.primary};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${Colors?.black};
`;

const StoryWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 29px;
  margin-bottom: 22px;
`;

const StatusBand = styled.TouchableOpacity<{
  active: boolean;
}>`
  height: 69px;
  width: 69px;
  background-color: ${({ active }) =>
    active ? Colors?.primary : Colors?.inactiveStory};
  border-width: 2px;
  border-radius: ${69 / 2}px;
  justify-content: center;
  align-items: center;
`;

const StoryImage = styled.Image`
  height: 59px;
  width: 59px;
  border-radius: ${59 / 2}px;
  border-width: 3px;
  border-color: ${Colors?.black};
`;

const ViewWrap = styled.View<{
  isFirst: boolean;
}>`
  align-items: center;
  justify-content: center;
  align-content: center;
  margin-right: 14px;
  margin-left: ${({ isFirst }) => (isFirst ? 20 : 0)}px;
`;

type StoryItemProp = {
  item:
    | {
        uri: string | any;
        text: string;
      }
    | any;
  index: number;
};

const renderItem = ({ item, index }: StoryItemProp) => {
  if (index === 0) {
    return (
      <ViewWrap isFirst={true}>
        <StatusBand active={false}>
          <AddWrap>
            <Black_add_svg />
          </AddWrap>
        </StatusBand>
        <CustomText
          color={Colors?.white}
          fontSize={13}
          fontFamily={Fonts.InterMedium}
          align="center"
          top={9}
          fontWeight="500"
        >
          Add Story
        </CustomText>
      </ViewWrap>
    );
  }
  return (
    <ViewWrap isFirst={false}>
      <StatusBand active={true}>
        <StoryImage source={{ uri: item.uri }} resizeMode="cover" />
      </StatusBand>
      <CustomText
        color={Colors?.white}
        fontSize={13}
        fontFamily={Fonts.InterMedium}
        align="center"
        top={9}
        fontWeight="500"
      >
        {item?.text}
      </CustomText>
    </ViewWrap>
  );
};

const Stories = () => {
  return (
    <StoryWrap>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={[
          {
            text: "Add Story",
          },
          {
            uri: "https://images.unsplash.com/photo-1675673428645-5fb5fa263898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
            text: "Pravan",
          },
          {
            uri: "https://images.unsplash.com/photo-1675432980667-95da207814a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
            text: "Ayesha",
          },
          {
            uri: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=665&q=80",
            text: "Roshni",
          },
          {
            uri: "https://images.unsplash.com/photo-1675659999529-630a3febadfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Samantha",
          },
          {
            uri: "https://images.unsplash.com/photo-1675332911379-9bf948fd339a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            text: "Esther",
          },
          {
            uri: "https://images.unsplash.com/photo-1675685828034-be58f6f986c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Drogba",
          },
        ]}
        keyExtractor={(item, index) => `${index}${Date.now()}`}
        renderItem={renderItem}
      />
    </StoryWrap>
  );
};

export default Stories;
