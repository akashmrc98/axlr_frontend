import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { FaSearch } from "react-icons/fa";

import { useProductStore } from "../../pages/Products/useProductStore";

export default function ProductsSearchForm() {

  const { filters, setFilters } = useProductStore((state) => state)
  const [query, setQuery] = useState("")

  return (
    <Stack py={2} spacing={4}>
      <InputGroup
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        <InputLeftElement h="100%" pointerEvents="none">
          <FaSearch color="gray" size={20} />
        </InputLeftElement>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          type="search"
          placeholder="Search...."
          onKeyDown={(e) => {
            if (e.key === "Enter")
              setFilters({ ...filters, query: query })
          }}
        />
      </InputGroup>
    </Stack>
  );
}
