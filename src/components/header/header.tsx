/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Drawer, Flex, Menu } from "@mantine/core";
import { IconBuildingStore, IconMenu2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../navbar/navbar";
import { useGetAllStoresQuery } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStore, setStores } from "@/store/slices";
import { RootState } from "@/store/store";

export default function Header() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.userStores.stores);
  const selectedStore = useSelector(
    (state: RootState) => state.userStores.selectedStore
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { data, error, isLoading, isSuccess, isError } = useGetAllStoresQuery(
    {}
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setStores(data?.payload));
      dispatch(
        setSelectedStore(
          selectedStore !== null ? selectedStore : data.payload[0]
        )
      );
    }
  }, [isSuccess, isError, data?.payload, dispatch]);

  return (
    <div>
      <div className="w-full bg-white p-4 border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-light border-solid">
        <Flex
          direction={"row-reverse"}
          className="w-full"
          align={"center"}
          justify={"space-between"}
        >
          <IconMenu2
            className="block cursor-pointer lg:hidden"
            onClick={open}
          />
          <Menu width={"target"}>
            <Menu.Target>
              <Button
                loading={isLoading}
                variant="outline"
                leftSection={<IconBuildingStore size={24} />}
              >
                {selectedStore?.storeName}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {stores?.map((store, i) => (
                <Menu.Item
                  key={i}
                  onClick={() => {
                    dispatch(setSelectedStore(store));
                    window.location.reload();
                  }}
                >
                  {store?.storeName}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </div>
      <Drawer
        className="m-0 p-0"
        classNames={{
          body: "m-0 p-0 w-fit",
          content: "w-fit",
          root: "w-fit",
        }}
        position="left"
        size={"xs"}
        withCloseButton={false}
        opened={opened}
        onClose={close}
      >
        <Navbar />
      </Drawer>
    </div>
  );
}
