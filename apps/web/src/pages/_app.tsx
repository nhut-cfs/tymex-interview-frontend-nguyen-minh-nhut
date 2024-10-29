import "@/styles/globals.css";
import { useTransition } from "react";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";

import theme from "@/theme/themeConfig";
import { PageLoader } from "@repo/ui";
import AppLayout from "@/components/Layout";

import "@fontsource/inter";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function App({ Component, pageProps }: AppProps) {
  const [loading] = useTransition();

  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        {loading ? (
          <PageLoader />
        ) : (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        )}
      </Provider>
    </ConfigProvider>
  );
}
