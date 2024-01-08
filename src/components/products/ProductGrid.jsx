/* eslint-disable react/prop-types */
import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";

import { FaStar } from "react-icons/fa";

export default function ProductsGrid({ products }) {
  return (
    <Grid>
      {products.length > 0 ? (
        <Grid
          p={12}
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr",
          }}
          rowGap="2rem"
          columnGap={"2rem"}
          transition="all 400ms ease-in-out"
        >
          {products.map((p, i) => (
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent="space-between"
              p={4}
              _hover={{
                boxShadow: "xl",
                transform: "scale(1.04)",
              }}
              transition="all 200ms ease-in-out"
              boxShadow={"md"}
              cursor={"pointer"}
              borderRadius="xl"
              key={i}
            >
              <Image
                p={2}
                maxH="200px"
                objectFit={"contain"}
                src={p.imageUrl}
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
                    {` ${p.rating}`}
                  </Text>
                  <Heading fontSize={{ base: "2xl" }}>{p.price}₹</Heading>
                </Flex>
                <Text fontWeight={"500"} fontSize={"sm"}>
                  {p.title.substring(0, 256)}...
                </Text>
              </Flex>
            </Box>
          ))}
        </Grid>
      ) : (
        <Flex minH="40vh" p={4} alignItems="center" justifyContent={"center"}>
          <Heading py={4} textAlign={"center"}>
            {`Oops can't find any items.`}{" "}
          </Heading>
        </Flex>
      )}
    </Grid>
  );
}
