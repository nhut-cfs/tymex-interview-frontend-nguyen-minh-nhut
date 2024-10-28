import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "#DA458F",
    colorTextBase: "#FFF",
    fontFamily: "Inter",
  },
  components: {
    Button: {
      borderRadius: 4,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 24,
    },
    Layout: {
      headerPadding: "0 25px",
    },
  },
};

export default theme;
