"use client";

import { Pagination } from "@/components";
import { store, useGetAllMerchantsQuery } from "@/store";
import { Button, Card, Image, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [stores, setStores] = useState([]);

  const { data, error, isError, isSuccess, isLoading } =
    useGetAllMerchantsQuery({});

  useEffect(() => {
    if (isSuccess) {
      setStores(data?.payload);
    }

    if (isError) {
      toast.error((error as any)?.data?.message);
    }
  }, [data?.payload, error, isError, isSuccess]);

  return (
    <div>
      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        Магазины
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 1, lg: 5, md: 4 }}>
        {stores?.map((store: any, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder px={"xs"} py={"xs"}>
              <Text>{store?.store_name}</Text>
            </Card.Section>
            <Card.Section>
              <Image
                src={store?.image ? store?.image : "store-placeholder.png"}
                className="w-full object-contain"
                alt="Norway"
              />
            </Card.Section>
            <Text size="sm" py={"xs"} c="dimmed">
              {store?.description?.length > 25
                ? store?.description?.substr(0, 25) + "..."
                : store?.description}
            </Text>
            <Button color="green" variant="outline" fullWidth radius="md">
              Посмотреть
            </Button>
          </Card>
        ))}
      </SimpleGrid>

      <div className="w-full flex items-center justify-center mt-5">
        <Pagination total={data?.totalPages} />
      </div>
    </div>
  );
}
