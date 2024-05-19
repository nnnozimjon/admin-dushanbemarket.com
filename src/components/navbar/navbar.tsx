"use client";

import { useState } from "react";
import { Flex, Group } from "@mantine/core";
import {
  IconLogout,
  IconUserScan,
  IconPackage,
  IconShoppingCart,
  IconFileDollar,
  IconArrowDown,
  IconArrowRight,
  IconPoint,
  IconCategory,
  IconCategory2,
  IconAd2,
  IconBrand4chan,
  IconTruckDelivery,
  IconChartArcs,
  IconMoneybag,
} from "@tabler/icons-react";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "@/components";


interface ILink {
  link: string,
  label: string,
  icon: any
  links: {
    label: string,
    link: string
  }[]
}
const data: ILink[] = [
  {

    link: "/users",
    label: "Пользователи",
    icon: IconUserScan,
    links: [],
  },
  {
    link: "/product",
    label: "Продукты",
    icon: IconPackage,
    links: [],
  },
  {
    link: "/order",
    label: "Заказы",
    icon: IconShoppingCart,
    links: [],
  },
  {
    link: "",
    label: "Счет",
    icon: IconFileDollar,
    links: [ ],
  },
  {
    link: "",
    icon: IconCategory2,
    label: "Категории",
    links: []
  },
  {
    link: "",
    icon: IconAd2,
    label: "Баннеры",
    links: []
  }, 
  {
    link: "",
    icon: IconBrand4chan,
    label: "Бренды",
    links: []
  },
  {
    link: "",
    icon: IconTruckDelivery,
    label: "Спосбы доставки",
    links: []
  },
  {
    link: "",
    icon: IconChartArcs,
    label: "Характеристики",
    links: []
  },
  {
    link: "",
    icon: IconMoneybag,
    label: "Cпосбы оплаты",
    links: []
  },
];

export default function Navbar() {
  const [active, setActive] = useState("Billing");

  const links = data?.map((item, index) => (
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
          <Icon name="logo" className="w-[50px] h-[50px] text-green"/>
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
