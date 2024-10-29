import React, { ChangeEvent, useEffect } from "react";
import debounce from "lodash/debounce";
import get from "lodash/get";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Select, Slider } from "antd";
import { useDispatch } from "react-redux";

import { productSlice } from "@/state/slices/productState";
import { useLazyGetProductsQuery } from "@/state/nextApi/slices/products";
import { useAppSelector } from "@/state/store";

const TIER_OPTIONS = ["Basic", "Premium", "Deluxe"];
const THEME_OPTIONS = ["Dark", "Light", "Colorful", "Halloween"];
const TIME_OPTIONS = ["Latest", "Oldest"];
const PRICE_OPTIONS = ["Low to High", "High to Low"];

const mapOptionsLabelValue = (options: string[]) =>
  options.map((option) => ({ value: option, label: option }));

const Filters = () => {
  const { criteriaFilter, metadata, products } = useAppSelector(
    (state) => state.productState
  );

  const [getProducts, { isFetching }] = useLazyGetProductsQuery();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts({
      filters: criteriaFilter,
      metadata: { _page: metadata?.page },
    }).then((res) => {
      if (res.data?.length > 0) {
        dispatch(
          productSlice.actions.setProducts(products.concat(res.data ?? []))
        );
      }
    });
  }, [metadata?.page]);

  useEffect(() => {
    productSlice.actions.setLoading(isFetching);
  }, [isFetching]);

  const handleChange =
    (
      field:
        | "category"
        | "keyword"
        | "tier"
        | "theme"
        | "time"
        | "price"
        | "priceRange"
    ) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | number[]) => {
      dispatch(
        productSlice.actions.setFieldValue({
          field,
          value: get(event, "target.value", event),
        })
      );
    };

  const handleDebounceChange = (
    field:
      | "category"
      | "keyword"
      | "tier"
      | "theme"
      | "time"
      | "price"
      | "priceRange"
  ) =>
    debounce(
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | number[]) => {
        handleChange(field)(event);
      },
      500
    );

  const onFinish = (values: any) => {
    getProducts({ filters: values, metadata: { _page: 1 } }).then((res) => {
      dispatch(productSlice.actions.setProducts(res.data ?? []));
    });
  };

  const onReset = () => {
    form.resetFields();
    dispatch(productSlice.actions.resetFilter());
  };

  const handleDebounceSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      productSlice.actions.setFieldValue({
        field: "keyword",
        value: event.target?.value,
      })
    );
    getProducts({
      filters: { ...criteriaFilter, keyword: event.target?.value },
      metadata: { _page: 1 },
    }).then((res) => {
      dispatch(productSlice.actions.setProducts(res.data ?? []));
    });
  };

  return (
    <Form
      form={form}
      name="filterForm"
      onFinish={onFinish}
      style={{ width: 350 }}
      layout="vertical"
    >
      <Form.Item name="keyword" label="">
        <Input
          name="keyword"
          placeholder="Quick search"
          prefix={<SearchOutlined />}
          onChange={handleDebounceSearch}
        />
      </Form.Item>
      <div style={{ marginTop: 70 }}>
        <Form.Item name="priceRange" label="">
          <Slider
            range
            defaultValue={[0.01, 200]}
            min={0.01}
            max={200}
            marks={{ 0.01: "0.01", 200: "200" }}
            onChange={handleDebounceChange("priceRange")}
          />
        </Form.Item>
      </div>

      <Form.Item name="tier" label="Tier">
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("tier")}
          options={mapOptionsLabelValue(TIER_OPTIONS)}
          allowClear
        />
      </Form.Item>
      <Form.Item name="theme" label="Theme">
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("theme")}
          options={mapOptionsLabelValue(THEME_OPTIONS)}
          allowClear
        />
      </Form.Item>
      <Form.Item name="time" label="Time">
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("time")}
          options={mapOptionsLabelValue(TIME_OPTIONS)}
          allowClear
        />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("price")}
          options={mapOptionsLabelValue(PRICE_OPTIONS)}
          allowClear
        />
      </Form.Item>
      <Flex justify="space-between">
        <Button
          icon={<CloseOutlined />}
          type="text"
          iconPosition="start"
          onClick={onReset}
        >
          Reset filter
        </Button>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Flex>
    </Form>
  );
};

export default Filters;
