"use client";

import React, { useEffect, useState } from "react";
import CardDataStats from "@/components/card-data-stats/CardDataStats";
import {
  IconBasketCheck,
  IconBasketX,
  IconNotes,
  IconShip,
} from "@tabler/icons-react";
import { Flex, Image, SimpleGrid, Text } from "@mantine/core";
import ProductOrderCard from "@/components/product-order-card/ProductOrderCard";
import { useGetAllOrdersQuery, useGetOrdersCountQuery } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Icon } from "@/components";

export default function OrderList() {
  const storeId = useSelector(
    (state: RootState) => state?.userStores?.selectedStore?.storeId
  );

  const [ordersList, setOrdersList] = useState([]);
  const [orderCount, setOrdersCount] = useState<any>({});

  const { data, error, isSuccess, isError, isLoading, refetch } =
    useGetAllOrdersQuery({
      storeId,
    });
  const {
    data: dataCount,
    isSuccess: isSuccessCount,
    isError: isErrorCount,
    refetch: refetchCount,
  } = useGetOrdersCountQuery(storeId);

  useEffect(() => {
    if (isSuccess) {
      setOrdersList(data?.payload);
    }
  }, [isSuccess, isError, refetch, data?.payload]);

  useEffect(() => {
    if (isSuccessCount) {
      setOrdersCount(dataCount?.payload);
    }
  }, [isSuccessCount, isErrorCount, refetchCount, dataCount?.payload]);

  const refetchOrders = () => {
    refetch();
    refetchCount();
  };

  return (
    <div>
      <SimpleGrid cols={{ base: 2, sm: 2, lg: 5, md: 4 }} className="mb-2">
        <CardDataStats title="Все заказы" total={orderCount?.all}>
          <IconNotes size={44} color="#ffbf00" />
        </CardDataStats>
        <CardDataStats title="На удержании" total={orderCount?.process}>
          <IconBasketCheck size={44} color="#00abfb" />
        </CardDataStats>
        <CardDataStats title="Отмененные заказы" total={orderCount?.canceled}>
          <IconBasketX size={44} color="#ff4500" />
        </CardDataStats>
        <CardDataStats title="Выполненные заказы" total={orderCount?.completed}>
          <IconShip size={44} color="#00b341" />
        </CardDataStats>
      </SimpleGrid>
      <br />

      {/* Orders */}
      <SimpleGrid
        cols={{ base: 1, sm: 1, md: 3, lg: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {ordersList?.map((order: any, key) => (
          <ProductOrderCard
            id={order?.id}
            phoneNumber={order?.phone_number}
            comment={order?.comment}
            address={order?.address}
            totalAmount={order?.total_amount}
            orderDate={order?.order_date}
            orderItems={order?.order_items}
            refetch={refetchOrders}
            key={key}
          />
        ))}
      </SimpleGrid>

      {ordersList?.length == 0 && (
        <Flex
          direction={"column"}
          gap={"lg"}
          className="w-full h-full mt-[100px]"
          align={"center"}
          justify={"center"}
        >
          <Icon
            name="shippingCargo"
            className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
          />
          <Flex direction={"column"} align={"center"}>
            <Text className="text-[#212121] font-bold text-[16px] text-center">
              Вы еще не добавили ни одного товара!
            </Text>
            <Text className="text-center">
              Добавьте свои продукты, чтобы разместить их здесь.
            </Text>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
