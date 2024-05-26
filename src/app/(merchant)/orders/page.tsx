import React from "react";
import CardDataStats from "@/components/card-data-stats/CardDataStats";
import {
  IconBasketCheck,
  IconBasketX,
  IconNotes,
  IconShip,
} from "@tabler/icons-react";
import { SimpleGrid } from "@mantine/core";
import ProductOrderCard from "@/components/product-order-card/ProductOrderCard";

export default function OrderList() {
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
        <ProductOrderCard />
        <ProductOrderCard />
        <ProductOrderCard />
        <ProductOrderCard />
        <ProductOrderCard />
        <ProductOrderCard />
      </SimpleGrid>
    </div>
  );
}
