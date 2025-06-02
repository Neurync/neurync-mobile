import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const screenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10%'
  }
});