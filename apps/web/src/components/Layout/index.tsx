import React, { ReactNode } from "react";
import { Layout } from "antd";
import { MENU } from "@/configs";
import NavBar from "./NavBar";

const { Footer, Content } = Layout;

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar items={MENU} />
      <Content>{children}</Content>
      <Footer style={{ background: "#17161A" }}>
        Tymex Interview Frontend Nguyen Minh Nhut ©2024
      </Footer>
    </Layout>
  );
};

export default AppLayout;
