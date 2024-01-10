import { Box, Divider, Flex, Grid, Heading, Text } from "@chakra-ui/react";

import Navbar from "../components/common/Navbar";
import SearchForm from "../components/products/SearchForm";
import FiltersForm from "../components/products/FilterForm";
import ProductsGrid from "../components/products/ProductGrid";
import ProductsPagination from "../components/products/ProductsPagination";

import { useEffect } from "react";

import { useFiltersHook } from "../hooks/useFiltersHook";
import { useSortingHook } from "../hooks/useSortingHook";
import { usePaginationHook } from "../hooks/usePaginationHook";

import { useProductsHook } from "../hooks/useProductsHook";

export default function Products() {
  const LIMIT = 40;

  const {
    maxPrice,
    minPrice,
    priceRange,
    query,
    rating,
    setMaxPrice,
    setMinPrice,
    setQuery,
    setRating,
  } = useFiltersHook();

  const { page, pagination, results, setPage, getPagination } =
    usePaginationHook({ query, rating, minPrice, maxPrice, LIMIT });

  const { products, setProducts, getProducts } = useProductsHook({
    maxPrice,
    minPrice,
    page,
    query,
    rating,
    LIMIT,
  });

  const {
    priceSort,
    ratingSort,
    setPriceSort,
    setRatingSort,
    sortByPrice,
    sortByRatings,
  } = useSortingHook({ products, setProducts });

  useEffect(() => {
    getPagination();
    getProducts();
  }, [page]);

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
            priceRange={priceRange}
            rating={rating}
            setRating={setRating}
            maxPrice={maxPrice}
            minPrice={minPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
            getProducts={getProducts}
            getPagination={getPagination}
          />
        </Box>
        <Box>
          <Flex px={24} justifyContent={"space-between"} alignItems="center">
            <Box>
              <Heading>Products</Heading>
              {pagination.pages.length > 0 ? <Text>{results}</Text> : null}
            </Box>
            <SearchForm
              getProducts={getProducts}
              getPagination={getPagination}
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
