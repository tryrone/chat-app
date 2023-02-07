import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface ScreenDefaultProps {
  navigation: NativeStackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
}
