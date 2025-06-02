import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const screenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10%'
  },
  title: {
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: 30,
    color: colors.black,
  }
});