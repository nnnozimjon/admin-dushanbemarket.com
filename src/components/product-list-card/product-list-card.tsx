"use client";

import { Card, Group, Text, Menu, ActionIcon, Image, rem, Button } from "@mantine/core";
import { IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useDeleteProductByIdMutation } from "@/store";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  images: string[];
  id: number;
  productName: string;
  status: string;
  refetch: () => void;
}

export default function ProductListCar({
  id,
  images,
  productName,
  refetch,
  status,
}: Props) {
  const storeId = useSelector(
    (state: RootState) => state.userStores.selectedStore?.storeId
  );
  const [deleteProduct, { isError, isSuccess, isLoading, error, data }] =
    useDeleteProductByIdMutation();

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
      refetch();
    }
  }, [isError, isSuccess]);

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500} className="text-sm">
            {id}
          </Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => window.location.replace("/products/edit/" + id)}
                leftSection={
                  <IconEdit style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Редактировать
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  window.location.replace("/products/preview/" + id)
                }
                leftSection={
                  <IconEye style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Просматривать
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                color="red"
                onClick={() => deleteProduct({ storeId, productId: id })}
              >
                Удалить
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section>
        <Image className="h-[200px] object-contain p-4" src={images[0]} alt="" />
      </Card.Section>

      <Card.Section
        inheritPadding
        pb="md"
        className="border-t border-solid border-l-0 border-r-0 border-b-0 pt-2 border-[rgba(0,0,0,0.1)] "
      >
        <Text fw={500} className="text-sm">
          {productName?.length > 30 ? productName.substring(0,30) + '...' : productName}
        </Text>
      </Card.Section>

      {status == 'review' && <Button className="text-[11px] cursor-default" variant="outline" disabled>На рассмотрении</Button>}
    </Card>
  );
}
