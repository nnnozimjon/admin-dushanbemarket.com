"use client";

import {
  Button,
  Container,
  FileButton,
  Flex,
  Image,
  InputBase,
  Paper,
  Select,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  

  return (
    <Container size={"xl"}>
      <Paper withBorder shadow="sm" className="p-4 w-full">
        <Flex align={"center"} className="w-full" justify={"space-between"}>
          <div className="flex">
            <Image
              className="w-[100px] h-[100px] rounded-full border-2 p-1 border-solid border-green"
              src={"./store-placeholder.png"}
              alt=""
            />
            <IconTrash
              size={40}
              className="bg-[white] rounded-full p-2 shadow-lg text-[red] cursor-pointer"
            />
          </div>
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button variant="outline" {...props}>
                Upload image
              </Button>
            )}
          </FileButton>
        </Flex>
        <br />
        <Flex gap={"md"} direction={"column"}>
          <InputBase
            label="Название магазина"
            placeholder="Название магазина"
            classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
            value={"Sagi"}
          />
          <InputBase
            label="Описание магазина"
            placeholder="Описание магазина"
            classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
            value={"Sagi"}
          />
          <Select
            label="Город"
            placeholder="Город"
            classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
            value={"Душанбе"}
            data={["Душанбе"]}
          />
        </Flex>
        <Flex>
        <Button></Button>
        </Flex>
      </Paper>
    </Container>
  );
}
