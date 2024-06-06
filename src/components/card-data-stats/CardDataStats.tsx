import { Paper, Text } from "@mantine/core";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
  href: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
  href,
}) => {
  return (
    <Paper shadow="xs" radius="lg" withBorder p="md">
      {children}
      <div>
        <Text className="font-semibold text-[24px]">{total}</Text>
        <a href={href} className="text-[#64748B] text-[0.875rem]">{title}</a>
      </div>
    </Paper>
  );
};

export default CardDataStats;
