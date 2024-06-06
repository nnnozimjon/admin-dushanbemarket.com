"use client";

import CardDataStats from "@/components/card-data-stats/CardDataStats";
import { useGetOrdersCountQuery } from "@/store";
import { RootState } from "@/store/store";
import { SimpleGrid } from "@mantine/core";
import {
  IconBasketCheck,
  IconBasketX,
  IconNotes,
  IconShip,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LayoutContext } from "./context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeId = useSelector(
    (state: RootState) => state?.userStores?.selectedStore?.storeId
  );
  const [orderCount, setOrdersCount] = useState<any>({});

  const {
    data: dataCount,
    isSuccess: isSuccessCount,
    isError: isErrorCount,
    refetch: refetchCount,
  } = useGetOrdersCountQuery(storeId);

  useEffect(() => {
    if (isSuccessCount) {
      setOrdersCount(dataCount?.payload);
    }
  }, [isSuccessCount, isErrorCount, refetchCount, dataCount?.payload]);

  return (
    <LayoutContext.Provider value={{ refetchCount }}>
      <div>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 5, md: 4 }} className="mb-2">
          <CardDataStats
            href="/orders"
            title="Все заказы"
            total={orderCount?.all}
          >
            <IconNotes size={44} color="#ffbf00" />
          </CardDataStats>
          <CardDataStats
            href="/orders/in-process"
            title="В процессе"
            total={orderCount?.process}
          >
            <IconBasketCheck size={44} color="#00abfb" />
          </CardDataStats>
          <CardDataStats
            href="/orders/canceled"
            title="Отмененные заказы"
            total={orderCount?.canceled}
          >
            <IconBasketX size={44} color="#ff4500" />
          </CardDataStats>
          <CardDataStats
            href="/orders/completed"
            title="Выполненные заказы"
            total={orderCount?.completed}
          >
            <IconShip size={44} color="#00b341" />
          </CardDataStats>
        </SimpleGrid>
        <br />
        {children}
      </div>
    </LayoutContext.Provider>
  );
}
