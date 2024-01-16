import { Button, Flex, Text } from "@chakra-ui/react";

import { useDispatch, useSelector, } from "react-redux";
import { loadPagination } from "../../pages/Products/ProductsSlice";

export default function ProductsPagination() {

  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.products.pagination)

  function prevPage() {
    if (pagination.currentPage > 1)
      dispatch(loadPagination({ ...pagination, currentPage: pagination.currentPage - 1 }))
  }

  function nextPage() {
    if (pagination.currentPage < pagination.totalPages)
      dispatch(loadPagination({ ...pagination, currentPage: pagination.currentPage + 1 }))
  }

  function setPage(page) {
    dispatch(loadPagination({ ...pagination, currentPage: page }))
  }

  return (
    <>
      {pagination ?
        <>
          {pagination.pages.length > 0 ? (
            <Flex my={12} justifyContent={"space-evenly"} alignItems="center">
              <Button
                onClick={prevPage}
                isDisabled={pagination.currentPage <= 1}
                mr={2}
              >
                Previous
              </Button>
              <Flex
                my={3}
                justifyContent={"center"}
                columnGap=".4rem"
                alignItems={"center"}
                rowGap={".4rem"}
              >
                {pagination.pages
                  .slice(
                    pagination.currentPage > 5 ? pagination.currentPage - 4 : 0,
                    pagination.currentPage + 10
                  )
                  .map((p, i) => (
                    <Text
                      borderRadius={"xl"}
                      cursor={"pointer"}
                      minH="8"
                      minW="8"
                      bg={p !== pagination.currentPage ? "gray.200" : "black"}
                      color={p === pagination.currentPage ? "gray.200" : "black"}
                      p={1}
                      onClick={() => setPage(p)}
                      textAlign="center"
                      key={i}
                    >
                      {p}
                    </Text>
                  ))}
              </Flex>
              <Button
                isDisabled={pagination.currentPage === pagination.totalPages}
                onClick={nextPage}
              >
                Next
              </Button>
            </Flex>
          ) : null}
        </>
        : null}
    </>
  );
}
