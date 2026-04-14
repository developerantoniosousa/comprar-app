import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d2d8",
    alignItems: "center",
    paddingTop: 62,
  },
  logo: {
    width: 134,
    height: 34,
  },
  form: {
    paddingHorizontal: 16,
    gap: 7,
    width: "100%",
    marginTop: 42,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e6ec",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    fontSize: 12,
    color: "#828282",
    fontWeight: 600,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#eef0f5",
    marginVertical: 16,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  empty: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
  },
});
