"use client";

import ViewOrderDetails from "@/modals/view-order-details";
import { useChangeStatusOrderMutation } from "@/store";
import { RootState } from "@/store/store";
import {
  Avatar,
  Button,
  Flex,
  Grid,
  Image,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconEye, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export interface OrderItem {
  id: number;
  quantity: number;
  color: string | null;
  size: string | null;
  price: string;
  product_name: string;
  images: string[];
}
interface IProps {
  id: number;
  phoneNumber: string;
  comment: string;
  address: string;
  totalAmount: string;
  orderDate: string;
  orderItems: OrderItem[];
  refetch?: () => void
}

export default function ProductOrderCard({
  address,
  comment,
  id,
  orderDate,
  orderItems,
  phoneNumber,
  totalAmount,
  refetch
}: IProps) {
  const storeId = useSelector(
    (state: RootState) => state?.userStores?.selectedStore?.storeId
  );
  const [opened, { open, close }] = useDisclosure(false);

  const [changeStatus, { isError, isSuccess }] = useChangeStatusOrderMutation();

  useEffect(() => {
    if(isSuccess) {
      refetch && refetch()
    }
  }, [isSuccess])

  return (
    <Paper shadow="xs" radius="lg" withBorder>
      <SimpleGrid className="w-full" cols={{ sm: 1, lg: 1, md: 1 }}>
        <div className="p-4">
          <Image className="rounded-lg" alt="" src={orderItems[0]?.images[0]} />
        </div>
        <Flex direction={"column"} className="px-4">
          <Grid>
            <Grid.Col span={6}>
              <Avatar.Group>
                {orderItems
                  ?.slice(0, 3)
                  .map((order, key) => (
                    <Avatar
                      key={key}
                      src={order?.images[0]}
                      radius="xl"
                      size={45}
                    />
                  ))}
                {orderItems && orderItems.length > 3 && (
                  <Avatar radius="xl" size={45}>
                    +{orderItems.length - 3}
                  </Avatar>
                )}
              </Avatar.Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                className="w-full my-2 text-[10px]"
                variant="light"
                c={"blue"}
                color="blue"
                leftSection={<IconEye size={14} />}
                onClick={open}
              >
                Посмотреть
              </Button>
            </Grid.Col>
          </Grid>
          <Grid className="mb-4">
            <Grid.Col span={6}>
              <Button
                className="w-full text-[12px]"
                variant="light"
                c={"red"}
                color="red"
                leftSection={<IconX size={14} />}
                onClick={() =>
                  changeStatus({ storeId, orderId: id, status: "decline" })
                }
              >
                Отменить
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                className="w-full text-[12px]"
                variant="light"
                leftSection={<IconCheck size={14} />}
                c={"green"}
                color="green"
                onClick={() =>
                  changeStatus({ storeId, orderId: id, status: "accept" })
                }
              >
                Принять
              </Button>
            </Grid.Col>
          </Grid>
        </Flex>
      </SimpleGrid>
      <ViewOrderDetails
        address={address}
        comment={comment}
        orderDate={orderDate}
        orderItems={orderItems}
        phoneNumber={phoneNumber}
        close={close}
        open={open}
        opened={opened}
      />
    </Paper>
  );
}
