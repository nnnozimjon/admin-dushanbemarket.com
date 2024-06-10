"use client";

import {
  useChangePasswordMutation,
  useGetStoreInfoQuery,
  useUpdateStoreInfoMutation,
} from "@/store";
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

interface IChangePassword {
  prevPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

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

  const [changePasswordState, setChangePasswordState] =
    useState<IChangePassword>({
      prevPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

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

  const changePasswordStateValue = (
    key: keyof IChangePassword,
    value: string
  ) => {
    setChangePasswordState((prev) => ({ ...prev, [key]: value }));
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

  const [
    changePassword,
    {
      isSuccess: isSuccessChangePassword,
      isError: isErrorChangePassword,
      data: dataChangePassword,
      error: errorChangePassword,
    },
  ] = useChangePasswordMutation();

  useEffect(() => {
    if (isSuccessChangePassword) {
      toast.success((dataChangePassword as any)?.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    if (isErrorChangePassword) {
      toast.error((errorChangePassword as any)?.data?.message);
    }
  }, [isSuccessChangePassword, isErrorChangePassword]);

  const updateMerchantPassword = async () => {
    const { confirmNewPassword, newPassword, prevPassword } =
      changePasswordState;

    if (!prevPassword) {
      return toast.info("Пожалуйста, предоставьте свой старый пароль!");
    }

    if (!newPassword) {
      return toast.info("Пожалуйста, укажите новый пароль!");
    }

    if (!confirmNewPassword) {
      return toast.info("Пожалуйста, подтвердите свой новый пароль!");
    }

    if (confirmNewPassword !== newPassword) {
      return toast.info("Пароль не совпадает с паролем для подтверждения!");
    }

    await changePassword({
      prevPassword,
      newPassword,
    });
  };

  return (
    <Container size={"xl"}>
      <Paper withBorder shadow="sm" className="p-4 w-full">
        <Flex
          align={"center"}
          className="w-full flex-col md:flex-row"
          justify={"space-between"}
        >
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
              <Button
                className="mt-4 md:mt-0"
                color="green"
                variant="outline"
                {...props}
              >
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

      <br />

      <Paper withBorder shadow="sm" className="p-4 w-full">
        <InputBase
          label="Старый пароль"
          placeholder="Старый пароль"
          classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
          value={changePasswordState.prevPassword}
          onChange={(e) =>
            changePasswordStateValue("prevPassword", e.target.value)
          }
          type="password"
        />
        <InputBase
          label="Новый пароль"
          placeholder="Новый пароль"
          classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
          value={changePasswordState.newPassword}
          onChange={(e) =>
            changePasswordStateValue("newPassword", e.target.value)
          }
          type="password"
        />
        <InputBase
          label="Подтвердите новый пароль"
          placeholder="Подтвердите новый пароль"
          classNames={{ input: "p-2 h-[50px] border-green text-[1rem]" }}
          value={changePasswordState.confirmNewPassword}
          onChange={(e) =>
            changePasswordStateValue("confirmNewPassword", e.target.value)
          }
          type="password"
        />

        <Button
          onClick={updateMerchantPassword}
          color="green"
          className="w-full my-4"
        >
          Изменить пароль
        </Button>
      </Paper>
    </Container>
  );
}
