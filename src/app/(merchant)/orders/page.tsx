"use client";

import React, { useEffect, useState } from "react";
import CardDataStats from "@/components/card-data-stats/CardDataStats";
import {
  IconBasketCheck,
  IconBasketX,
  IconNotes,
  IconShip,
} from "@tabler/icons-react";
import { SimpleGrid } from "@mantine/core";
import ProductOrderCard from "@/components/product-order-card/ProductOrderCard";
import { useGetAllOrdersQuery } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function OrderList() {
  const storeId = useSelector(
    (state: RootState) => state?.userStores?.selectedStore?.storeId
  );

  const [ordersList, setOrdersList] = useState([]);

  const { data, error, isSuccess, isError, isLoading } = useGetAllOrdersQuery({
    storeId,
  });

  useEffect(() => {
    if (isSuccess) {
      setOrdersList(data?.payload);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <SimpleGrid
        cols={{ base: 2, sm: 2, lg: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
        className="mb-2"
      >
        <CardDataStats title="Все заказы" total="20">
          <IconNotes size={44} color="#ffbf00" />
        </CardDataStats>
        <CardDataStats title="На удержании" total="20">
          <IconBasketCheck size={44} color="#00abfb" />
        </CardDataStats>
        <CardDataStats title="Отмененные заказы" total="20">
          <IconBasketX size={44} color="#ff4500" />
        </CardDataStats>
        <CardDataStats title="Выполненные заказы" total="20">
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
            key={key}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
