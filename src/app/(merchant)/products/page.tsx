"use client";

import React, { useEffect, useState } from "react";
import { Pagination, ProductListCard } from "@/components";
import { Button, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import { useGetAllProductQuery } from "@/store";
import empty from "@/assets/empty-cart.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProductPayload {
  images: string;
  id: number;
  name: string;
}

export default function ProductList() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0)

  const store_id = useSelector(
    (state: RootState) => state.userStores.selectedStore?.storeId
  );

  const [products, setProducts] = useState<any[]>([]);
  const { data, isError, error, isSuccess, isLoading, refetch } =
    useGetAllProductQuery({ store_id, pageNumber, pageSize });

  useEffect(() => {
    if (isSuccess) {
      setProducts(data?.payload);
      setTotalCount(data?.totalPages)
    }

    isError && toast.error((error as any)?.data?.message);
  }, [data?.payload, error, isError, isSuccess]);

  useEffect(() => {
    refetch()
  }, [refetch, store_id, pageNumber, pageSize])

  return (
    <div>
      <Button
        className="w-[50px] h-[50px] rounded-full absolute bottom-4 right-7 z-[100]"
        onClick={() => window.location.replace("/products/create")}
      >
        +
      </Button>
      <SimpleGrid
        cols={{ lg: 5, md: 4, sm: 2, base: 2 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {!isLoading &&
          products?.map((product: ProductPayload, index: number) => (
            <ProductListCard
              refetch={refetch}
              id={product?.id}
              productName={product?.name}
              images={product?.images?.split(",")}
              key={index}
            />
          ))}
      </SimpleGrid>
      {products?.length == 0 && (
        <Flex
          direction={"column"}
          gap={"lg"}
          className="w-full h-full mt-[100px]"
          align={"center"}
          justify={"center"}
        >
          <Image
            src={empty.src}
            alt="empty"
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
      <Flex align={'center'} justify={'center'} my={10}>
        <Pagination total={totalCount} onChange={(e) => setPageNumber(e)}/>
      </Flex>
    </div>
  );
}
