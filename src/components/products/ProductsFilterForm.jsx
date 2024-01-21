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
import { useState } from "react";
import { FaStar } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../pages/Products/ProductsSlice";

export default function ProductsFiltersForm() {

  const dispatch = useDispatch()
  const filters = useSelector((state) => state.products.filters)

  const [rating, setRating] = useState(2)
  const [form, setForm] = useState({
    minPrice: 0,
    maxPrice: 100000
  })
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    })
  }

  function search() {
    const d = {
      ...filters,
      ...form,
      rating
    }
    dispatch(filterProducts(d))
  }

  const priceRange = [
    150, 250, 500, 1000, 1500, 2500, 5000, 10000, 15000, 25000,
  ];
  return (
    <Stack py={8} spacing={2}>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Flex columnGap={"1rem"}>
          <Select
            name="minPrice"
            value={form.minPrice}
            onChange={(e) => handleChange(e)}
          >
            {priceRange.slice(0, 5).map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </Select>

          <Select
            name="maxPrice"
            value={form.maxPrice}
            onChange={(e) => handleChange(e)}
          >
            {priceRange.slice(6, 10).map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Flex>
      </FormControl>
      <Button onClick={search} size="sm">
        Search
      </Button >
      <Divider my={4} />
      <FormControl>
        <FormLabel>Rating</FormLabel>
        <Flex flexDir={"column"}>
          {[4, 3, 2, 1].map((s, i) => (
            <Box
              onClick={() => {
                setRating(s)
                search()
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
    </Stack >
  );
}
