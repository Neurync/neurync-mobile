import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/theme"

export const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    lineHeight: 45,
    marginVertical: 5,
    textAlign: "center"
  },
  inputSection: {
    display: "flex",
    gap: 20,
    width: "100%"
  },
  notAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3
  },
  notAccountText: {
    textAlign: "center",
    fontSize: fontSize.lg
  },
  stepContainer: {
    padding: 40,
    alignItems: "center",
    alignContent: 'space-between',
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
    backgroundColor: colors.white
  },
  bottomStep: {
    height: "30%",
    width: '100%',
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 12,
    paddingBottom: 32
  }
});