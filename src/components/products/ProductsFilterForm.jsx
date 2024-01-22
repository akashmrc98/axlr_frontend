import {
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Box,
  Divider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";



import { FaStar } from "react-icons/fa";
import { MdGraphicEq } from 'react-icons/md'

import { useState } from "react";
import { useProductStore } from "../../pages/Products/useProductStore";

export default function ProductsFiltersForm() {

  const { filters, setFilters } = useProductStore((state) => state)

  const [rating, setRating] = useState(2)
  const [form, setForm] = useState({
    minPrice: 150,
    maxPrice: 499999
  })
  function handleMinMaxChange(e) {
    const minPrice = Math.round(49999 * (Number(e[0]) / 100))
    const maxPrice = Math.round(49999 * (Number(e[1]) / 100))
    setForm({
      minPrice: minPrice,
      maxPrice: maxPrice,
    })
    setFilters({
      ...filters,
      minPrice: minPrice,
      maxPrice: maxPrice,
      rating
    })
  }

  return (
    <Stack py={8} spacing={2}>

      <FormControl>
        <Flex justifyContent={"space-evenly"}>
          <Box bg="green.200" px={4} py={1} borderRadius={"md"}>{form.minPrice}</Box>
          <Box bg="orange.200" px={4} py={1} borderRadius={"md"}>{form.maxPrice}</Box>
        </Flex>
      </FormControl>
      <FormControl
        py={2} px={4}
      >
        <RangeSlider
          defaultValue={[1, 30]}
          onChangeStart={handleMinMaxChange}
          onChangeEnd={handleMinMaxChange}
          step={.25}
          min={.25}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0}>
            <Box color='tomato' as={MdGraphicEq} />
          </RangeSliderThumb>
          <RangeSliderThumb index={1} >
            <Box color='tomato' as={MdGraphicEq} />
          </RangeSliderThumb>
        </RangeSlider>
        <FormLabel >Price</FormLabel>
      </FormControl>
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
                <Flex key={v} p={1}>
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


