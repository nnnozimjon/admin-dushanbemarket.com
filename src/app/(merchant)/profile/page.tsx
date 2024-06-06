"use client";

import { useGetStoreInfoQuery, useUpdateStoreInfoMutation } from "@/store";
import { RootState } from "@/store/store";
import {
  Button,
  Container,
  FileButton,
  Flex,
  Image,
  InputBase,
  Paper,
  Select,
  Textarea,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IStoreState {
  storeName: string;
  storeDescription: string;
  cityName: string;
  storeImage: string;
}

const initialStoreStateValue: IStoreState = {
  storeName: "",
  storeDescription: "",
  storeImage: "",
  cityName: "",
};

export default function Page() {
  const store_id = useSelector(
    (state: RootState) => state.userStores.selectedStore?.storeId
  );

  const [file, setFile] = useState<File | null>(null);
  const [deleteImage, setDeleteImage] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [storeInfo, setStoreInfo] = useState<IStoreState>(
    initialStoreStateValue
  );

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetStoreInfoQuery({
      storeId: store_id,
    });

  const [
    updateStore,
    {
      data: dataUpdateStore,
      isLoading: isLoadingUpdateStore,
      isSuccess: isSuccessUpdateStore,
      isError: isErrorUpdateStore,
      error: errorUpdateStore,
    },
  ] = useUpdateStoreInfoMutation();

  useEffect(() => {
    if (isSuccess) {
      setStoreInfo(data?.payload);
    }
  }, [isSuccess, isError]);

  const changeStateValue = (key: keyof IStoreState, value: string) => {
    setStoreInfo((prev) => ({ ...prev, [key]: value }));
  };

  const updateMerchantStore = () => {
    const formData = new FormData();
    formData.append("storeName", storeInfo.storeName);
    formData.append("storeDescription", storeInfo.storeDescription);
    // @ts-ignore
    formData.append("deleteImage", deleteImage);
    // @ts-ignore
    formData.append("storeImage", file);

    updateStore({
      storeId: store_id,
      body: formData,
    });
  };

  useEffect(() => {
    if (!file) {
      setImageSrc("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (isSuccessUpdateStore) {
      toast.success((dataUpdateStore as any)?.message);
      refetch();
    }

    if (isErrorUpdateStore) {
      toast.error((errorUpdateStore as any)?.data?.message);
    }
  }, [isSuccessUpdateStore, isErrorUpdateStore]);

  const handleDeleteImage = () => {
    if (imageSrc) {
      setImageSrc("");
    }

    if (storeInfo?.storeImage) {
      changeStateValue("storeImage", "");
      setDeleteImage(
        storeInfo?.storeImage?.split("/")[
          storeInfo?.storeImage?.split("/")?.length - 1
        ]
      );
    }
  };

  return (
    <Container size={"xl"}>
      <Paper withBorder shadow="sm" className="p-4 w-full">
        <Flex align={"center"} className="w-full flex-col md:flex-row" justify={"space-between"}>
          <div className="flex">
            <Image
              className="w-[100px] h-[100px] rounded-full border-2 p-1 border-solid border-green"
              src={
                imageSrc || storeInfo?.storeImage || "./store-placeholder.png"
              }
              alt=""
            />
            {(storeInfo?.storeImage || imageSrc) && (
              <IconTrash
                size={40}
                className="bg-[white] rounded-full p-2 shadow-lg text-[red] cursor-pointer"
                onClick={handleDeleteImage}
              />
            )}
          </div>
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button className="mt-4 md:mt-0" color="green" variant="outline" {...props}>
                Изменить логотип магазина
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
            value={storeInfo?.storeName}
            onChange={(e) => changeStateValue("storeName", e.target.value)}
          />
          <Textarea
            label="Описание магазина"
            placeholder="Описание магазина"
            classNames={{ input: "p-2 h-[150px] border-green text-[1rem]" }}
            value={storeInfo?.storeDescription}
            onChange={(e) =>
              changeStateValue("storeDescription", e.target.value)
            }
          />
          <Select
            disabled
            label="Город"
            placeholder="Город"
            classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
            value={storeInfo?.cityName}
            onChange={(city) => changeStateValue("cityName", city || "")}
            data={["Душанбе"]}
          />
        </Flex>
        <Flex gap={"lg"}>
          <Button
            onClick={() => window.location.reload()}
            color="green"
            variant="outline"
            className="w-full my-4"
          >
            Отмена
          </Button>
          <Button
            onClick={updateMerchantStore}
            color="green"
            className="w-full my-4"
          >
            Сохранить изменения
          </Button>
        </Flex>
      </Paper>
    </Container>
  );
}
