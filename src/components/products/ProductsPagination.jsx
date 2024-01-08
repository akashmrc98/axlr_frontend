/* eslint-disable react/prop-types */
import { Button, Flex, Text } from "@chakra-ui/react";

export default function ProductsPagination({ pagination, setPage, page }) {
  return (
    <>
      {pagination.pages.length > 0 ? (
        <Flex my={12} justifyContent={"space-evenly"} alignItems="center">
          <Button
            onClick={() => setPage(page - 1)}
            isDisabled={page === 1}
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
            {pagination.pages.slice(0, 10).map((p, i) => (
              <Text
                borderRadius={"xl"}
                cursor={"pointer"}
                minH="8"
                minW="8"
                bg={p !== page ? "gray.200" : "black"}
                color={p === page ? "gray.200" : "black"}
                p={1}
                textAlign="center"
                onClick={() => setPage(p)}
                key={i}
              >
                {p}
              </Text>
            ))}
          </Flex>
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        </Flex>
      ) : null}
    </>
  );
}
