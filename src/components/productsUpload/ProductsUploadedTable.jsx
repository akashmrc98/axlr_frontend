import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { FaStar } from "react-icons/fa";

import { useProductUploadStore } from "../../pages/ProductsUpload/useProductsUploadStore";

export default function ProductsUploadedTable() {

  const { products, pagination: { currentPage } } = useProductUploadStore((state) => state)
  const LIMIT = 8;

  let productsTemp = products
  productsTemp = productsTemp.slice(currentPage * LIMIT - 7, currentPage * LIMIT)

  return (
    <>
      {productsTemp.length > 0 ? (
        <TableContainer px={24}>
          <Table
            borderRadius={"xl"}
            boxShadow={"2xl"}
            variant={"striped"}
            colorScheme="teal"
          >
            <Thead borderRadius={"xl"}>
              <Tr borderRadius={"xl"}>
                {["Title", "Price", "Rating"].map((t, i) => (
                  <Th key={i}>{t}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody borderRadius={"xl"}>
              {productsTemp.map((t, i) => (
                <Tr borderRadius={"xl"} key={i}>
                  <Td>{t.title.substring(0, 64)}...</Td>
                  <Td>{t.price}₹</Td>
                  <Td>
                    <Flex alignItems={"center"} columnGap=".24rem">
                      <Text>{t.rating}</Text>
                      <FaStar></FaStar>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
}

