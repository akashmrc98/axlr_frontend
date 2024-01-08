/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { authBearerHeader, removeToken } from "../config/jwt";

import Navbar from "../components/common/Navbar";
import ProductsGrid from "../components/products/ProductGrid";
import FiltersForm from "../components/products/FilterForm";
import SearchForm from "../components/products/SearchForm";
import ProductsPagination from "../components/products/ProductsPagination";

export default function Products() {
  const limit = 40;

  const toast = useToast();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalProducts: 1,
    totalPages: 1,
    pages: [],
    currentPage: 1,
  });
  const [rating, setRating] = useState(2);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [ratingSort, setRatingSort] = useState("asc");
  const [priceSort, setPriceSort] = useState("asc");

  function sortByRatings() {
    let p = products;
    console.log("ok", ratingSort);
    if (ratingSort === "asc") {
      p = products.sort((a, b) => a.rating - b.rating);
      setProducts([...p]);
    }
    if (ratingSort === "desc") {
      p = products.sort((a, b) => b.rating - a.rating);
      setProducts([...p]);
    }
  }

  function sortByPrice() {
    let p = products;
    if (priceSort === "asc") {
      p = p.sort((a, b) => a.price - b.price);
      setProducts([...p]);
    }
    if (priceSort === "desc") {
      p = p.sort((a, b) => b.price - a.price);
      setProducts([...p]);
    }
  }

  function getProducts() {
    axios
      .get(`http://localhost:3000/api/v1/products/`, {
        params: {
          page,
          query,
          rating,
          minPrice,
          maxPrice,
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
        toast({
          title: `Oops!`,
          description: `${err.response.data.message}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
          size: "lg",
        });
        setTimeout(() => {
          removeToken();
          navigate("/");
        }, 5000);
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
      <Grid
        gridTemplateColumns={{ base: "1fr ", lg: "2fr 9fr" }}
        px={4}
        py={4}
        h="100%"
      >
        <Box mt={24}>
          <FiltersForm
            rating={rating}
            setRating={setRating}
            maxPrice={maxPrice}
            minPrice={minPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
            getProducts={getProducts}
          />
        </Box>
        <Box>
          <Flex justifyContent={"space-evenly"} alignItems="center">
            <Box>
              <Heading>Products</Heading>
              {pagination.pages.length > 0 ? <Text> {results} </Text> : null}
            </Box>
            <SearchForm
              getProducts={getProducts}
              query={query}
              setQuery={setQuery}
              sortByRatings={sortByRatings}
              ratingSort={ratingSort}
              setRatingSort={setRatingSort}
              priceSort={priceSort}
              setPriceSort={setPriceSort}
              sortByPrice={sortByPrice}
            />
          </Flex>
          <Divider mx="auto" w="80%" />
          <ProductsGrid products={products} />
          <Divider mx="auto" w="80%" />
          <ProductsPagination
            page={page}
            pagination={pagination}
            setPage={setPage}
          />
        </Box>
      </Grid>
    </Box>
  );
}
