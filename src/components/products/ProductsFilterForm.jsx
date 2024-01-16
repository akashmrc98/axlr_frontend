import {
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Button,
  Box,
  Divider,
  Select,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function ProductsFiltersForm({
  rating,
  setRating,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  getProducts,
  getPagination,
}) {
  const priceRange = [
    150, 250, 500, 1000, 1500, 2500, 5000, 10000, 15000, 25000,
  ];
  return (
    <Stack py={8} spacing={2}>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Flex columnGap={"1rem"}>
          <Select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            {priceRange.slice(0, 5).map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </Select>

          <Select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            {priceRange.slice(6, 10).map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Flex>
      </FormControl>
      <Button
        onClick={() => {
          getPagination();
          getProducts();
        }}
        size="sm"
      >
        Search
      </Button>
      <Divider my={4} />
      <FormControl>
        <FormLabel>Rating</FormLabel>
        <Flex flexDir={"column"}>
          {[4, 3, 2, 1].map((s, i) => (
            <Box
              onClick={() => {
                setRating(s);
                getProducts();
              }}
              cursor={"pointer"}
              rowGap=".5rem"
              columnGap={".5rem"}
              boxShadow={"md"}
              borderRadius="md"
              display={"flex"}
              bg={rating === s ? "black" : "transparent"}
              color={rating !== s ? "black" : "white"}
              p={2}
              key={i}
            >
              {s}
              {[...Array(s).keys()].map((v, j) => (
                <Flex key={j} p={1}>
                  <FaStar key={j} />
                </Flex>
              ))}
            </Box>
          ))}
        </Flex>
      </FormControl>
    </Stack>
  );
}
