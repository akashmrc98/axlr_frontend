import { Box, Button, Flex, Text, } from "@chakra-ui/react";

export default function ProductsUploadedPagination({
  products,
  pages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <>
      {products.length > 0 ? (
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
                {pages.map((p, i) => (
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
                isDisabled={100 >= products.length}
              >
                Next
              </Button>
            </Flex>
          ) : null}
        </Box>
      ) : null}
    </>
  );
}
