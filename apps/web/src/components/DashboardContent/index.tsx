import { Flex, Grid } from "antd";
import React, { useEffect } from "react";
import Filters from "./Filters";
import List from "./List";
import { useLazyGetProductsQuery } from "@/state/nextApi/slices/products";
import { useDispatch } from "react-redux";
import { productSlice } from "@/state/slices/productState";

const { useBreakpoint } = Grid;

const DashboardContent = () => {
  const screens = useBreakpoint();
  const [getProducts] = useLazyGetProductsQuery();
  const dispatch = useDispatch();
  console.log(screens);
  useEffect(() => {
    getProducts({ filters: {} }).then((res) => {
      dispatch(productSlice.actions.setProducts(res.data ?? []));
    });
  }, []);

  return (
    <>
      <Flex vertical={!screens.lg} gap={40}>
        <div style={{ width: 350 }}>
          <Filters />
        </div>
        <List />
      </Flex>
    </>
  );
};

export default DashboardContent;
