import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Grid, Flex, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

const { useBreakpoint } = Grid;
const { Header } = Layout;

const useStyles = createStyles(() => ({
  header: {
    fontFamily: '"DroneRangerPro", sans-serif',
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

interface MenuItemProps {
  label: string;
  key: string;
  pathname: string;
}

const NavBar = ({ items }: { items: MenuItemProps[] }) => {
  const { styles } = useStyles();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Header>
      <Flex justify="space-between">
        <Space style={{ width: "100%" }} styles={{ item: { width: "100%" } }}>
          {screens.lg ? (
            <Menu
              theme="dark"
              mode="horizontal"
              items={items}
              className={styles.header}
            />
          ) : (
            <>
              <Button
                type="text"
                icon={
                  <MenuOutlined style={{ color: "#fff", fontSize: "1.5rem" }} />
                }
                onClick={toggleDrawer}
              />

              <Drawer
                title="MyApp"
                placement="right"
                closable
                onClose={toggleDrawer}
                open={drawerVisible}
              >
                <Menu mode="vertical" items={items} />
              </Drawer>
            </>
          )}
        </Space>
        <Space>
          <Button type="primary">Connect Wallet</Button>
        </Space>
      </Flex>
    </Header>
  );
};

export default NavBar;
