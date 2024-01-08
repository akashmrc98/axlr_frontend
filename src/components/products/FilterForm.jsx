/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Input,
  Button,
  Box,
  Divider,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function FiltersForm({
  rating,
  setRating,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  getProducts,
}) {
  return (
    <Stack py={8} spacing={2}>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Flex columnGap={"1rem"}>
          <Input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="min price"
            size="sm"
            max={250000}
            type="number"
          ></Input>
          <Input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="max price"
            size="sm"
            min={400}
            text="number"
          ></Input>
        </Flex>
      </FormControl>
      <Button onClick={getProducts} size="sm">
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
