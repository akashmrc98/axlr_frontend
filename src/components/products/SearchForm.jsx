/* eslint-disable react/prop-types */
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tag,
} from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

export default function SearchForm({
  query,
  setQuery,
  getProducts,
  priceSort,
  setPriceSort,
  sortByPrice,
  ratingSort,
  setRatingSort,
  sortByRatings,
}) {
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
            if (e.key === "Enter") getProducts();
          }}
        />
      </InputGroup>
      <Flex columnGap={".5rem"} alignItems="center">
        <Tag
          onClick={() => {
            if (priceSort === "asc") setPriceSort("desc");
            else if (priceSort === "desc") setPriceSort("asc");
            else setPriceSort("asc");
            sortByPrice();
          }}
          cursor={"pointer"}
          display="flex"
          alignItems={"center"}
          columnGap=".5rem"
        >
          Price
          {priceSort === "asc" ? <GoSortAsc /> : null}
          {priceSort === "desc" ? <GoSortDesc /> : null}
        </Tag>
        <Tag
          onClick={() => {
            if (ratingSort === "asc") setRatingSort("desc");
            else if (ratingSort === "desc") setRatingSort("asc");
            else setRatingSort("asc");
            sortByRatings();
          }}
          cursor={"pointer"}
          display="flex"
          alignItems={"center"}
          columnGap=".5rem"
        >
          Rating
          {ratingSort === "asc" ? <GoSortAsc /> : null}
          {ratingSort === "desc" ? <GoSortDesc /> : null}
        </Tag>
      </Flex>
    </Stack>
  );
}
