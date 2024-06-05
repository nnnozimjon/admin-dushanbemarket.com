"use client";

import { Icon } from "@/components";
import { useGetAllPaymentsQuery } from "@/store";
import { Flex, Image, Paper, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface Payment {
  id: number;
  title: string;
  image: string;
  description: string | null;
}

export default function Page() {
  const [payments, setPayments] = useState([]);
  const { isError, isSuccess, data, error, isLoading } = useGetAllPaymentsQuery(
    {}
  );

  useEffect(() => {
    if (isSuccess) {
      setPayments(data?.payload);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        Спосбы оплаты
      </Text>
      <SimpleGrid cols={{ base: 1, md: 4 }}>
        {payments?.map((payment: Payment, index: number) => (
          <Paper key={index} withBorder className="p-5">
            <Flex align={"center"} direction={"column"} justify={'center'}>
              <Image src={payment?.image} className="w-[200px]" alt="" />
              <Text className="text-[2.125rem]">{payment?.title}</Text>
            </Flex>
          </Paper>
        ))}
        <Paper
          withBorder
          className="p-5 flex items-center justify-center border-green select-none cursor-pointer"
        >
          <Icon height={50} width={50} name="plus2" className="text-green" />
        </Paper>
      </SimpleGrid>
    </div>
  );
}
