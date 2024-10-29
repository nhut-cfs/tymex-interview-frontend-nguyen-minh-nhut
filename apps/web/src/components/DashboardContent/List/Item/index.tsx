import { Product } from "@/state/slices/productState";
import { Card, Flex, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;
const Item = ({ item }: { item: Product }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={item.title}
          // temp image instead correct product image
          src={item.author?.avatar}
        />
      }
      style={{ marginBottom: 40 }}
    >
      <Meta
        title={
          <Flex justify="space-between" align="center">
            <Text>{item.title}</Text>
            <Text>{`${item.price} ETH`}</Text>
          </Flex>
        }
        description={
          <Text>
            {[item.author?.firstName, item.author?.lastName]
              .filter((text) => Boolean(text))
              .join("_")}
          </Text>
        }
      />
    </Card>
  );
};

export default Item;
