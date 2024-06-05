"use client"

import React from "react";
import Navbar from "../navbar/navbar";
import { Container, Flex } from "@mantine/core";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const user = useSelector((state: RootState) => state?.user?.user);
  return (
    <Flex>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="h-screen overflow-scroll w-full scrollbar-hide">
        {user?.user_role === 'merchant' && <Header />}
        <Container size={"xl"} className="p-2">
          {children}
        </Container>
      </div>
    </Flex>
  );
};
