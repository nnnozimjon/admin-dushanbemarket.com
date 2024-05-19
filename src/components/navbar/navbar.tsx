"use client";

import { useState } from "react";
import { Flex, Group } from "@mantine/core";
import {
  IconLogout,
  IconUserScan,
  IconPackage,
  IconShoppingCart,
  IconFileDollar,
  IconCategory2,
  IconAd2,
  IconBrand4chan,
  IconTruckDelivery,
  IconChartArcs,
  IconMoneybag,
} from "@tabler/icons-react";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ILink {
  link: string;
  label: string;
  icon: any;
}

const data: ILink[] = [
  {
    link: "/users",
    label: "Пользователи",
    icon: IconUserScan,
  },
  {
    link: "/products",
    label: "Продукты",
    icon: IconPackage,
  },
  {
    link: "/orders",
    label: "Заказы",
    icon: IconShoppingCart,
  },
  {
    link: "/invoices",
    label: "Счет",
    icon: IconFileDollar,
  },
  {
    link: "/categories",
    icon: IconCategory2,
    label: "Категории",
  },
  {
    link: "/banners",
    icon: IconAd2,
    label: "Баннеры",
  },
  {
    link: "/brands",
    icon: IconBrand4chan,
    label: "Бренды",
  },
  {
    link: "/delivery-types",
    icon: IconTruckDelivery,
    label: "Спосбы доставки",
  },
  {
    link: "/characteristics",
    icon: IconChartArcs,
    label: "Характеристики",
  },
  {
    link: "/payment-types",
    icon: IconMoneybag,
    label: "Cпосбы оплаты",
  },
];

const roleLinks = {
  admin: [
    "/users",
    "/products",
    "/orders",
    "/invoices",
    "/categories",
    "/banners",
    "/brands",
    "/delivery-types",
    "/characteristics",
    "/payment-types",
  ],
  merchant: [
    "/products",
    "/orders",
    "/invoices",
  ],
};

type userRole = 'admin' | 'merchant'

export default function Navbar() {
  const userRole = useSelector((state: RootState) => state?.user?.user?.user_role)
  const [active, setActive] = useState("Billing");

  const filterLinksByRole = (role: userRole) => {
    return data.filter((link) => roleLinks[role].includes(link.link));
  };

  // @ts-ignore
  const filteredLinks = filterLinksByRole(userRole);

  const links = filteredLinks?.map((item, index) => (
    <div key={index}>
      <div
        className={`${classes.link} cursor-pointer`}
        data-active={item.label === active || undefined}
        key={item.label}
        onClick={(event) => {
          if (item.label === active) {
            return setActive("");
          }
          setActive(item.label);
        }}
      >
        <Flex align={"center"} justify={"space-between"} className="w-full">
          <Flex align={"center"} justify={"center"}>
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <a className="no-underline text-blue w-full" href={item?.link}>
              {item.label}
            </a>
          </Flex>
        </Flex>
      </div>
    </div>
  ));

  return (
    <nav className={`${classes.navbar}`}>
      <div className={`${classes.navbarMain} px-2`}>
        <Group className={classes.header} justify="space-between">
          <Icon name="logo" className="w-[50px] h-[50px] text-green" />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
