import React, { Fragment } from "react";
import { useAppSelector } from "@/state/store";
import { Button, Col, Flex, Row, Typography, Spin } from "antd";
import Item from "./Item";
import { Product, productSlice } from "@/state/slices/productState";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;
const List = () => {
  const dispatch = useDispatch();
  const { products = [], loading } = useAppSelector(
    (state) => state.productState
  );
  const onFetchMore = () => {
    dispatch(productSlice.actions.updatePage());
  };

  return (
    <Flex vertical gap={20}>
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      ) : (
        <Fragment>
          {products?.length > 0 ? (
            <Fragment>
              <Row gutter={40}>
                {products.map((item: Product, index: number) => (
                  <Col
                    key={index}
                    xxl={{ span: 6 }}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                  >
                    <Item item={item} />
                  </Col>
                ))}
              </Row>
              <Flex align="center" justify="center">
                <Button
                  type="primary"
                  style={{
                    paddingTop: 25,
                    paddingBottom: 25,
                    paddingLeft: 120,
                    paddingRight: 120,
                  }}
                  onClick={onFetchMore}
                >
                  View More
                </Button>
              </Flex>
            </Fragment>
          ) : (
            <Text>No items</Text>
          )}
        </Fragment>
      )}
    </Flex>
  );
};

export default List;
