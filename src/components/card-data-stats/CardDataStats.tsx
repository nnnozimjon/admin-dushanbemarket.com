import { Paper, Text } from "@mantine/core";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <Paper shadow="xs" radius="lg" withBorder p="xl">
      {children}
      <div>
        <Text className="font-semibold text-[24px]">{total}</Text>
        <Text className="text-[#64748B] text-[0.875rem]">{title}</Text>
      </div>
    </Paper>
  );
};

export default CardDataStats;
