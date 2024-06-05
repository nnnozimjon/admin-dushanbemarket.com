"use client";

import { Icon } from "@/components";
import { useGetAllWidgetsQuery } from "@/store";
import { Flex, Image, SimpleGrid, Text } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const category_name = urlSearchParams.get("name");
  const params = useParams();

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery(String(params?.id));

  useEffect(() => {
    if (isSuccessCt) {
      setCategories(dataCt?.payload);
    }
  }, [isSuccessCt, isErrorCt]);

  return (
    <div>
      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        {category_name}
      </Text>
      <SimpleGrid
        cols={{ base: 3, md: 6, lg: 6 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {!isLoadingCt &&
          categories?.map((item: any, index: number) => (
            <Link
              className="no-underline text-[black]"
              key={index}
              href={`/widgets/${item?.category_id}?name=${item?.ct?.name}`}
            >
              <Flex direction={"column"} align={"center"} key={index}>
                <Image
                  src={item?.image}
                  className="rounded-xl w-full"
                  alt={`${item?.name}`}
                />
                <p className="text-sm md:text-base mt-2 text-center">
                  {item?.name}
                </p>
              </Flex>
            </Link>
          ))}
        <div className="no-underline text-[black] cursor-pointer">
          <Flex direction={"column"} align={"center"}>
            <Icon
              name="plus2"
              className="shrink-0 border-[3px] text-green border-green border-solid p-1 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0 rounded-full"
            />
            <p className="text-sm md:text-base text-center w-[100px] select-none">
              {"Добавить"}
            </p>
          </Flex>
        </div>
      </SimpleGrid>
    </div>
  );
}
