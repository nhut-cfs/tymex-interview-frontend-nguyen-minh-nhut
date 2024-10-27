import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

export default function App({ Component, pageProps }: AppProps) {
  console.log("aaa ConfigProvider", ConfigProvider);
  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
