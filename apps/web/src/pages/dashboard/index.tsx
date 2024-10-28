import { Flex } from "antd";
import SlideSVG from "./SlideSVG";
import { createStyles } from "antd-style";
import FooterContent from "./FooterContentSVG";
import DashboardContent from "@/components/DashboardContent";

const useStyles = createStyles(({}) => ({
  content: {
    backgroundImage: `url(./assets/images/bg.png)`,
    backgroundPosition: "center bottom",
    paddingTop: 120,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
    "> div": {
      maxWidth: "1500px",
      margin: "0 auto",
    },
  },
}));

const Dashboard = () => {
  const { styles } = useStyles();
  return (
    <Flex vertical gap={0}>
      <SlideSVG />
      <div className={styles.content}>
        <DashboardContent />
      </div>
      <div
        style={{
          background: "#020A12",
        }}
      >
        <FooterContent />
      </div>
    </Flex>
  );
};

export default Dashboard;
