import { Button, Flex, Text, } from "@chakra-ui/react";
import { useProductUploadStore } from "../../pages/ProductsUpload/useProductsUploadStore";

export default function ProductsUploadedPagination() {

  const { pagination, setPagination } = useProductUploadStore((state) => state)
  const { pages, currentPage, totalPages } = pagination

  return (
    <>
      {pages.length > 0 ? (
        <Flex my={12} justifyContent={"space-evenly"}>
          <Button
            onClick={() => setPagination({
              ...pagination,
              currentPage: currentPage - 1
            })}
            isDisabled={currentPage === 1}
            mr={2}
          >
            Previous
          </Button>
          <Flex columnGap=".4rem" rowGap={".4rem"}>
            {pages
              .slice(
                currentPage > 5 ? currentPage - 5 : 0,
                currentPage > 5 ? currentPage + 5 : 10
              )
              .map
              ((po, i) => (
                <Text

                  onClick={() => setPagination({
                    ...pagination,
                    currentPage: po
                  })}
                  borderRadius={"xl"}
                  cursor={"pointer"}
                  minH="8"
                  minW="8"
                  bg={po !== currentPage ? "gray.200" : "black"}
                  color={po === currentPage ? "gray.200" : "black"}
                  p={1}
                  textAlign="center"
                  key={i}
                >
                  {po}
                </Text>
              ))}
          </Flex>
          <Button
            onClick={() => setPagination({
              ...pagination,
              currentPage: currentPage + 1
            })}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      ) : null}
    </>
  );
}
