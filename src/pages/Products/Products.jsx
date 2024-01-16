import { Box, Divider, Grid, Text } from "@chakra-ui/react";

import ProductsListComponent from "../../components/products/ProductsListComponent";
import ProductsFiltersForm from "../../components/products/ProductsFilterForm";
import ProductsPagination from "../../components/products/ProductsPagination";
import Navbar from "../../components/common/Navbar";

import { useProductsHooks } from "./useProductsHook";
import { useProductsPaginationHook } from "./useProductsPaginationHook";
import { useSelector } from 'react-redux'


export default function Products() {

  const LIMIT = 40
  const pagination = useSelector((state) => state.products.pagination)
  const filters = useSelector((state) => state.products.filters)


  useProductsHooks({
    page: pagination.currentPage,
    query: filters.query,
    rating: filters.rating,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice
  })

  useProductsPaginationHook({
    page: pagination.currentPage,
    query: filters.query,
    rating: filters.rating,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice
  })

  return (
    <Box>
      <Navbar />
      <Grid
        gridTemplateColumns={{ base: "1fr ", lg: "2fr 9fr" }}
        px={4}
        py={4}
        h="100%"
      >
        <Box>
          <ProductsFiltersForm />
        </Box>
        <Box>
          <Text>
            {`Showing page ${pagination.currentPage} - ${pagination.totalPages}, ${pagination.currentPage * LIMIT - 39}-${pagination.totalPages * LIMIT
              } Results of ${pagination.pages.length * LIMIT}.`}
          </Text>
          <Divider mx="auto" w="80%" />
          <ProductsListComponent />
        </Box>
        <Divider mx="auto" w="80%" />
        <ProductsPagination />
      </Grid>
    </Box>
  );
}
