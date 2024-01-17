import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../pages/Products/ProductsSlice";

export default function ProductsSearchForm() {

  const dispatch = useDispatch()
  const filters = useSelector((state) => state.products.filters)

  const [query, setQuery] = useState("")

  return (
    <Stack py={6} spacing={4}>
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
              dispatch(filterProducts({ ...filters, query: query }))
          }}
        />
      </InputGroup>
    </Stack>
  );
}
