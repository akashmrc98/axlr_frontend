/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Grid,
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

export default function UploadTableComponent({
  products,
  startIndex,
  endIndex,
  pages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <>
      {products.length > 0 ? (
        <Grid>
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
                {products.slice(startIndex, endIndex).map((t, i) => (
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

          <Box my={12}>
            {pages.length > 0 ? (
              <Flex justifyContent={"space-evenly"}>
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  isDisabled={currentPage === 1}
                  mr={2}
                >
                  Previous
                </Button>
                <Flex columnGap=".4rem" rowGap={".4rem"}>
                  {pages.slice(0, 10).map((p, i) => (
                    <Text
                      borderRadius={"xl"}
                      cursor={"pointer"}
                      minH="8"
                      minW="8"
                      bg={i !== currentPage ? "gray.200" : "black"}
                      color={i === currentPage ? "gray.200" : "black"}
                      p={1}
                      textAlign="center"
                      key={i}
                    >
                      {p}
                    </Text>
                  ))}
                </Flex>
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  isDisabled={endIndex >= products.length}
                >
                  Next
                </Button>
              </Flex>
            ) : null}
          </Box>
        </Grid>
      ) : null}
      ;
    </>
  );
}
