"use client";

import { useGetAllAdminCategory } from "@/store";
import { Button, Chip, Flex, Menu, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const { data, isLoading, error, isError, isSuccess } = useGetAllAdminCategory(
    {}
  );

  useEffect(() => {
    if (isSuccess) {
      setCategories(data?.payload);
    }
  }, [isError, isSuccess]);

  const hideCategory = () => {};
  const showCategory = () => {};

  return (
    <div>
      <Text className="text-[1.2rem] text-green p-2 border-2 border-solid rounded-md">
        Категории
      </Text>
      <br />
      <SimpleGrid cols={{ base: 1, lg: 3, md: 4, sm: 1 }}>
        {categories?.map((item: any, index) => (
          <Menu key={index} width={"target"}>
            <Menu.Target>
              <Flex align={"center"} gap={"md"}>
                <Button variant="outline" color="blue" className="w-full">
                  {item?.name}
                </Button>
                <Chip color="green">{!true ? "Cкрыть" : "Показать"}</Chip>
              </Flex>
            </Menu.Target>
            <Menu.Dropdown>
              {item?.subCategories?.map((sub: any, index: number) => (
                <Menu.Item key={index}>{sub?.name}</Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        ))}
      </SimpleGrid>
    </div>
  );
}
