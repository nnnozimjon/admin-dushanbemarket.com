"use client";

import Icon from "@/components/icon/icon";
import { useGetAllWidgetsQuery } from "@/store";
import { Flex, Image, SimpleGrid, Skeleton, Text } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CarouselBanners {
  id: number;
  image: string;
  category_id: number;
  name: string;
  ct: {
    name: string;
  };
}

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [bannerCarousel, setBannerCarousel] = useState<CarouselBanners[]>([]);
  const [splitCarousel, setSplitCarousel] = useState<CarouselBanners[]>([]);

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery("home-ct");

  const {
    data: dataSubCt,
    isError: isErrorSubCt,
    isSuccess: isSuccessSubCt,
    isLoading: isLoadingSubCt,
    error: errorSubCt,
  } = useGetAllWidgetsQuery("home-sub-ct");

  const {
    data: dataCarousel,
    isError: isErrorCarousel,
    isSuccess: isSuccessCarousel,
    isLoading: isLoadingCarousel,
    error: errorCarousel,
  } = useGetAllWidgetsQuery("home-carousel");

  const {
    data: dataSplitCarousel,
    isError: isErrorSplitCarousel,
    isSuccess: isSuccessSplitCarousel,
    isLoading: isLoadingSplitCarousel,
    error: errorSplitCarousel,
  } = useGetAllWidgetsQuery("home-split-carousel");

  // categories
  useEffect(() => {
    if (isSuccessCt) {
      setCategories(dataCt?.payload);
    }
  }, [isSuccessCt, isErrorCt]);

  // sub-categories
  useEffect(() => {
    if (isSuccessSubCt) {
      setSubCategories(dataSubCt?.payload);
    }
  }, [isSuccessSubCt, isErrorSubCt]);

  // carousel
  useEffect(() => {
    if (isSuccessCarousel) {
      setBannerCarousel(dataCarousel?.payload);
    }
  }, [isSuccessCarousel, isErrorCarousel]);

  // split-carousel
  useEffect(() => {
    if (isSuccessSplitCarousel) {
      setSplitCarousel(dataSplitCarousel?.payload);
    }
  }, [isSuccessSplitCarousel, isErrorSplitCarousel]);

  return (
    <div>
      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        Home Categories
      </Text>
      <SimpleGrid cols={{ base: 3, sm: 3, md: 5, lg: 12 }}>
        {!isLoadingCt &&
          categories?.map((item: any, index: number) => (
            <Link
              key={index}
              className="no-underline text-[black]"
              href={`/widgets/${item?.category_id}?name=${item?.ct?.name}`}
            >
              <Flex direction={"column"} align={"center"} className="relative">
                <Image
                  src={item?.image}
                  className="shrink-0 border-[3px] border-green border-solid p-1 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0 rounded-full"
                  alt=""
                />
                <Icon
                  name="edit"
                  className="absolute right-0 bg-[green] text-[white] p-1 rounded-full shadow-lg cursor-pointer"
                />
                <p className="text-sm md:text-base text-center w-[100px] select-none">
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
      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        Home Subcategories
      </Text>
      <SimpleGrid cols={{ base: 3, sm: 3, md: 5, lg: 12 }}>
        {!isLoadingSubCt &&
          subCategories?.map((item: any, index: number) => (
            <Link
              href={`/widgets/${item?.category_id}?name=${item?.ct?.name}`}
              key={index}
              className="no-underline text-[black]"
            >
              <Flex
                key={index}
                direction={"column"}
                align={"center"}
                className="relative"
              >
                <Image
                  className="border-green border-solid  shrink-0 h-[80px] p-1 md:h-[100px] w-[80px] md:w-[100px] !m-0 rounded-full"
                  src={item?.image}
                  alt=""
                />
                <Icon
                  name="edit"
                  className="absolute right-0 bg-[green] text-[white] p-1 rounded-full shadow-lg cursor-pointer"
                />
                <p className="text-sm md:text-base text-center w-[100px]">
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
      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        Home Carousel Ads
      </Text>
      <SimpleGrid
        cols={{ base: 1, sm: 1, md: 2 }}
        spacing="md"
        className="mb-4 md:mb-10 select-none"
      >
        {isLoadingCarousel && (
          <Skeleton
            className="md:h-[500px] h-[250px]"
            radius="md"
            animate={false}
          />
        )}

        {!isLoadingCarousel &&
          bannerCarousel?.map((item: any, index: number) => (
            <Image
              key={index}
              src={item.image}
              alt={`ads`}
              className="bg-[red]"
              style={{
                borderRadius: "8px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          ))}
        <Flex
          align={"center"}
          justify={"center"}
          className="border-2 border-solid border-green rounded-md cursor-pointer"
        >
          <Icon name="plus2" className="h-[50px] w-[50px] text-green" />
        </Flex>
      </SimpleGrid>

      <Text className="text-[1.25rem] p-2 border-2 border-solid text-green rounded-md my-4 select-none">
        Split Ads
      </Text>

      <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }} className="select-none">
        {!isLoadingSplitCarousel &&
          splitCarousel?.length !== 0 &&
          splitCarousel?.map((item: any, index: number) => (
            <Image
              key={index}
              src={item?.image}
              alt={`ads`}
              className="w-full"
              style={{
                borderRadius: "8px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          ))}
        <Flex
          align={"center"}
          justify={"center"}
          className="border-2 border-solid border-green rounded-md cursor-pointer"
        >
          <Icon name="plus2" className="h-[50px] w-[50px] text-green" />
        </Flex>
      </SimpleGrid>
    </div>
  );
}
