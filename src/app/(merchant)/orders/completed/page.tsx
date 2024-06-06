"use client";

import React, { useContext, useEffect, useState } from "react";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import ProductOrderCard from "@/components/product-order-card/ProductOrderCard";
import { useGetAllOrdersQuery } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Icon, Pagination } from "@/components";
import { LayoutContext } from "../context";
import { ObjectToParams } from "@/utils/objectToParams";

export default function CompletedOrdersList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const { refetchCount } = useContext(LayoutContext);
  const storeId = useSelector(
    (state: RootState) => state?.userStores?.selectedStore?.storeId
  );

  const [ordersList, setOrdersList] = useState([]);

  const { data, error, isSuccess, isError, isLoading, refetch } =
    useGetAllOrdersQuery({
      storeId,
      statusId: 4,
      query: ObjectToParams({ pageNumber, pageSize }),
    });

  useEffect(() => {
    if (isSuccess) {
      setOrdersList(data?.payload);
      setTotalCount(data?.totalPages);
    }
  }, [isSuccess, isError, refetch, data?.payload]);

  const refetchOrders = () => {
    refetch();
    refetchCount();
  };

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize]);

  return (
    <div>
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
            status="completed"
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
            name="shippingRegular"
            className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
          />
          <Flex direction={"column"} align={"center"}>
            <Text className="text-[#212121] font-bold text-[16px] text-center">
              Нет выполненных заказов
            </Text>
            <Text className="text-center">
              Здесь будут отображаться завершенные заказы.
            </Text>
            <a href="/orders" className="text-green">
              Назад к активным заказам
            </a>
          </Flex>
        </Flex>
      )}
      <Flex align={"center"} justify={"center"} my={10}>
        <Pagination total={totalCount} onChange={(e) => setPageNumber(e)} />
      </Flex>
    </div>
  );
}
