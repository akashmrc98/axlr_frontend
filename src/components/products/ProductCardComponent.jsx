import { FaStar } from "react-icons/fa";
import { Box, Flex, Heading, Image, Text, } from "@chakra-ui/react";

export default function ProductCardComponent({ imageUrl, rating, price, title }) {
  return <Box
    display={"flex"}
    flexDirection="column"
    justifyContent="space-between"
    p={4}
    _hover={{
      boxShadow: "md",
      transform: "scale(1.04)",
    }}
    transition="all 200ms ease-in-out"
    boxShadow={"xl"}
    cursor={"pointer"}
    borderRadius="xl"
  >
    <Image
      p={2}
      maxH="200px"
      objectFit={"contain"}
      src={imageUrl}
    />
    <Flex flexDir={"column"} rowGap=".4rem">
      <Flex alignItems={"center"} columnGap="1rem">
        <Text
          display={"flex"}
          boxShadow={"dark-lg"}
          borderRadius="md"
          px={2}
          columnGap={".25rem"}
          alignItems={"center"}
        >
          <FaStar />
          {` ${rating}`}
        </Text>
        <Heading fontSize={{ base: "2xl" }}>{price}₹</Heading>
      </Flex>
      <Text fontWeight={"500"} fontSize={"sm"}>
        {title.substring(0, 256)}...
      </Text>
    </Flex>
  </Box>
}

