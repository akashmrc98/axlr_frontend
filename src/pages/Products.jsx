import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { FaSearch, FaStar } from "react-icons/fa";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { authBearerHeader } from "../config/jwt";

export default function Products() {
  const limit = 40;
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalProducts: 1,
    totalPages: 1,
    pages: [],
    currentPage: 1,
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);

  function getProducts() {
    axios
      .get(
        `http://localhost:3000/api/v1/products/`,
        {
          params: {
            page,
            query,
          },
        },
        {
          headers: {
            Authorization: authBearerHeader(),
          },
        }
      )
      .then((resp) => {
        setProducts([...resp.data.products]);
        setPagination(resp.data.pagination);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    setResults(
      `Showing ${page * limit - 39} - ${page * limit} Results of ${
        pagination.pages.length * limit
      }`
    );
  }, [page, pagination.pages.length]);

  return (
    <Box>
      <Navbar />
      <Grid px={4} py={12} h="100%">
        <Flex justifyContent={"space-between"} alignItems="center">
          <Box px={12} py={6}>
            <Heading>Products</Heading>
            {products.length < 0 ? <Text> {results} </Text> : null}
          </Box>
          <Box w="30%" py={6}>
            <Stack spacing={4}>
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
                  onChange={(e) => setQuery(e.target.value.trim())}
                  size="lg"
                  type="search"
                  placeholder="Search...."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") getProducts();
                  }}
                />
              </InputGroup>
            </Stack>
          </Box>
        </Flex>
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
                  <Box>
                    <Flex columnGap={".25rem"} alignItems={"center"}>
                      <FaStar />
                      {` ${p.rating}`}
                    </Flex>
                    <Heading>{p.price}₹</Heading>
                    <Text fontSize={"sm"}>{p.title.substring(0, 256)}...</Text>
                  </Box>
                </Box>
              ))}
            </Grid>
          ) : (
            <Flex
              minH="40vh"
              p={4}
              alignItems="center"
              justifyContent={"center"}
            >
              <Heading py={4} textAlign={"center"}>
                {`Oops can't find any items.`}{" "}
              </Heading>
            </Flex>
          )}
        </Grid>
        <Divider />
        {pagination.pages.length > 0 ? (
          <Flex my={12} justifyContent={"space-evenly"} alignItems="center">
            <Button
              onClick={() => setPage(page - 1)}
              isDisabled={page === 1}
              mr={2}
            >
              Previous
            </Button>
            <Flex
              my={3}
              justifyContent={"center"}
              columnGap=".4rem"
              alignItems={"center"}
              rowGap={".4rem"}
            >
              {pagination.pages.slice(0, 10).map((p, i) => (
                <Text
                  borderRadius={"xl"}
                  cursor={"pointer"}
                  minH="8"
                  minW="8"
                  bg={p !== page ? "gray.200" : "black"}
                  color={p === page ? "gray.200" : "black"}
                  p={1}
                  textAlign="center"
                  onClick={() => setPage(p)}
                  key={i}
                >
                  {p}
                </Text>
              ))}
            </Flex>
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          </Flex>
        ) : null}
      </Grid>
    </Box>
  );
}
