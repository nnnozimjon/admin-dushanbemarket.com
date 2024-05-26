"use client";

import ViewOrderDetails from "@/modals/view-order-details";
import {
  Avatar,
  Button,
  Flex,
  Grid,
  Image,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconEye, IconX } from "@tabler/icons-react";

interface IProps {
  onAccept: () => void
  onDecline: () => void
  // product: string
}

export default function ProductOrderCard() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Paper shadow="xs" radius="lg" withBorder>
      <SimpleGrid className="w-full" cols={{ sm: 1, lg: 1, md: 1 }}>
        <div className="p-4">
          <Image
            className="rounded-lg"
            alt=""
            src="https://api.dushanbemarket.com/store/api/v1/product/image/3c8eb458-8c7f-473f-b5d6-2aa9b62a3385.png"
          />
        </div>
        <Flex direction={"column"} className="px-4">
          <Grid>
            <Grid.Col span={6}>
              <Avatar.Group>
                <Avatar
                  src="https://api.dushanbemarket.com/store/api/v1/product/image/3c8eb458-8c7f-473f-b5d6-2aa9b62a3385.png"
                  radius="xl"
                  size={45}
                />
                <Avatar
                  src="https://api.dushanbemarket.com/store/api/v1/product/image/3c8eb458-8c7f-473f-b5d6-2aa9b62a3385.png"
                  radius="xl"
                  size={45}
                />
                <Avatar radius="xl" size={45}>
                  +40
                </Avatar>
              </Avatar.Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                className="w-full my-2"
                variant="light"
                c={"blue"}
                color="blue"
                leftSection={<IconEye size={14} />}
                onClick={open}
              >
                Посмотреть
              </Button>
            </Grid.Col>
          </Grid>
          <Grid className="mb-4">
            <Grid.Col span={6}>
              <Button
                className="w-full"
                variant="light"
                c={"red"}
                color="red"
                leftSection={<IconX size={14} />}
              >
                Отменить
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                className="w-full"
                variant="light"
                leftSection={<IconCheck size={14} />}
                c={"green"}
                color="green"
              >
                Принять
              </Button>
            </Grid.Col>
          </Grid>
        </Flex>
      </SimpleGrid>
      <ViewOrderDetails close={close} open={open} opened={opened}/>
    </Paper>
  );
}
