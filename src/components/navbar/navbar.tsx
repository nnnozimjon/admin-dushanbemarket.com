"use client";

import { useState } from "react";
import { Code,  Group } from "@mantine/core";
import {
  IconLogout,
  IconUserScan,
  IconPackage,
  IconShoppingCart,
  IconCategory2,
  IconBrand4chan,
  IconTruckDelivery,
  IconChartArcs,
  IconMoneybag,
  IconUser,
  IconBrandAppgallery,
  IconBuildingStore,
} from "@tabler/icons-react";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices";
import { usePathname } from "next/navigation";

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
    link: "/stores",
    label: "Магазины",
    icon: IconBuildingStore,
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
    link: "/categories",
    icon: IconCategory2,
    label: "Категории",
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
  {
    link: "/profile",
    icon: IconUser,
    label: "Профиль",
  },
  {
    link: "/widgets",
    icon: IconBrandAppgallery,
    label: "Виджеты",
  },
];

const roleLinks = {
  admin: [
    "/users",
    "/categories",
    "/stores",
    "/brands",
    "/delivery-types",
    "/characteristics",
    "/payment-types",
    "/widgets",
  ],
  merchant: ["/products", "/orders", "/profile"],
};

type userRole = "admin" | "merchant";

export default function Navbar() {
  const dispatch = useDispatch();
  const userRole = useSelector(
    (state: RootState) => state?.user?.user?.user_role
  );

  const pathName = usePathname()
  const [active, setActive] = useState(pathName);

  const filterLinksByRole = (role: userRole) => {
    return data?.filter((link) => roleLinks[role]?.includes(link.link));
  };

  // @ts-ignore
  const filteredLinks = filterLinksByRole(userRole);

  const links = filteredLinks?.map((item) => (
    <a
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Icon name="logo" className="w-[80px] h-[80px] text-[white]" />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => dispatch(logout())}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
