import { Alert, Modal, Table, Text } from "@mantine/core";

interface IProps {
  opened: boolean;
  open: () => void;
  close: () => void;
}

interface ITable {
  productName: string;
  quantity: number | string;
  color?: string;
  size?: string;
  price: string;
}

export default function ViewOrderDetails({ close, open, opened }: IProps) {
  const elements: ITable[] = [
    {
      productName: "Питса маргарита",
      quantity: 3,
      color: "-",
      size: "-",
      price: "1400",
    },
    {
      productName: "Крилишки 2х",
      quantity: 4,
      color: "-",
      size: "-",
      price: "1400",
    },
    {
      productName: "Хот дог",
      quantity: 4,
      color: "-",
      size: "-",
      price: "1400",
    },
    {
      productName: "Рол куриный",
      quantity: 6,
      color: "-",
      size: "-",
      price: "1400",
    },
    {
      productName: "Самбуса",
      quantity: 4,
      color: "-",
      size: "-",
      price: "1400",
    },
  ];

  const rows = elements?.map((element: ITable) => (
    <Table.Tr key={element.productName}>
      <Table.Td>{element.productName}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
      <Table.Td>{element.color}</Table.Td>
      <Table.Td>{element.size}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
    </Table.Tr>
  ));
  
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Детали заказа"
      centered
      classNames={{ content: "w-[600px] bg-[red]" }}
      size={"lg"}
    >
      <Text className="text-[1.25rem] font-bold text-[#212121]">
        Детали заказчика
      </Text>
      <Text> 📞 Номер телефона: 992985031200 </Text>
      <Text>🏠 Адрес: Бонки Алиф</Text>
      <Alert title="💬 Комментарий">Дезтар биёрш Ака</Alert>
      <div className="overflow-scroll scrollbar-hide">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Название</Table.Th>
              <Table.Th>Количество</Table.Th>
              <Table.Th>Цвет</Table.Th>
              <Table.Th>Размер</Table.Th>
              <Table.Th>Цена</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </Modal>
  );
}
