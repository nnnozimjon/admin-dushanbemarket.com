import { OrderItem } from "@/components/product-order-card/ProductOrderCard";
import { Alert, Modal, Table, Text } from "@mantine/core";

interface IProps {
  opened: boolean;
  open: () => void;
  close: () => void;
  phoneNumber: string;
  address: string;
  comment: string;
  orderDate: string;
  orderItems: OrderItem[];
}

interface ITable {
  productName: string;
  quantity: number | string;
  color?: string;
  size?: string;
  price: string;
}

export default function ViewOrderDetails({
  close,
  open,
  opened,
  address,
  comment,
  orderDate,
  orderItems,
  phoneNumber,
}: IProps) {
  const rows = orderItems?.map((element: OrderItem) => (
    <Table.Tr key={element.product_name}>
      <Table.Td>{element.product_name}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
      <Table.Td>{element.color}</Table.Td>
      <Table.Td>{element.size}</Table.Td>
      <Table.Td>
        {element.price} x {element.quantity} ={" "}
        <strong>
          {(Number(element.price) * Number(element.quantity)).toFixed(2)} c.
        </strong>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Детали заказа"
      centered
      classNames={{ content: "w-[600px]" }}
      size={"lg"}
    >
      <Text className="text-[1.25rem] font-bold text-[#212121]">
        Детали заказчика
      </Text>
      <Text> 📞 Номер телефона: {phoneNumber} </Text>
      <Text>🏠 Адрес: {address} </Text>
      <Text>Время заказа: {new Date(orderDate).toUTCString()}</Text>
      <Alert title="💬 Комментарий">{comment}</Alert>
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
