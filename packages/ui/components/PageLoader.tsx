import React from "react";
import { BounceLoader } from "react-spinners";
import { Row } from "antd";
const PageLoader = () => {
  return (
    <Row>
      <BounceLoader size={40} />
    </Row>
  );
};

export default PageLoader;
