
import { Box, Text } from "@chakra-ui/react";
import { useProductStore } from "../../pages/Products/useProductStore";

export default function ProductCountComponent() {
  const LIMIT = 40

  const { pagination } = useProductStore((state) => state)

  const minItems = pagination.currentPage * LIMIT - 39
  const maxItems = pagination.currentPage * LIMIT
  const totalItems = pagination.pages.length * LIMIT

  return <Box>
    <Text>{`Showing page ${pagination.currentPage} - ${pagination.totalPages}.`}</Text>
    <Text>{`Results ${minItems}-${maxItems} Results of ${totalItems}.`}</Text>
  </Box>
}
