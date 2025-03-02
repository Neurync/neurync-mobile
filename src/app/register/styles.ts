import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/theme"

export const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%"
  },
  title: {
    fontSize: fontSize.xl,
    marginVertical: 5,
    textAlign: "center"
  },
  inputSection: {
    display: "flex",
    gap: 20,
    width: "100%"
  },
  logo: {
    width: 300,
    height: 75
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
});