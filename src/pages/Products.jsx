/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { authBearerHeader } from "../config/jwt";

import Navbar from "../components/common/Navbar";
import ProductsGrid from "../components/products/ProductGrid";

export default function Products() {
  const toast = useToast();
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
      .get(`http://localhost:3000/api/v1/products/`, {
        params: {
          page,
          query,
        },
        headers: {
          Authorization: authBearerHeader(),
        },
      })
      .then((resp) => {
        setProducts([...resp.data.products]);
        setPagination(resp.data.pagination);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: `Oops!`,
          description: "Something went wrong, please try again",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          size: "lg",
        });
      });
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
            {pagination.pages.length > 0 ? <Text> {results} </Text> : null}
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
                  onChange={(e) => setQuery(e.target.value)}
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
        <ProductsGrid products={products} />
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
