import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";

import ProductsListComponent from "../../components/products/ProductsListComponent";
import ProductsFiltersForm from "../../components/products/ProductsFilterForm";
import ProductsSearchForm from "../../components/products/ProductsSearchForm";
import ProductsPagination from "../../components/products/ProductsPagination";
import Navbar from "../../components/common/Navbar";

import { useProductsHooks } from "./useProductsHook";
import { useSelector } from 'react-redux'
import ProductsSortingComponent from "../../components/products/ProductsSortingComponent";


export default function Products() {

  const LIMIT = 40
  const pagination = useSelector((state) => state.products.pagination)
  const filters = useSelector((state) => state.products.filters)

  const resultsLabel = `Showing page ${pagination.currentPage} - ${pagination.totalPages}, ${pagination.currentPage * LIMIT - 39}-${pagination.totalPages * LIMIT
    } Results of ${pagination.pages.length * LIMIT}.`


  useProductsHooks({
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
          <Flex px={6} justifyContent={"space-between"}>
            <Text>{resultsLabel}</Text>
            <Box>
              <ProductsSearchForm />
              <ProductsSortingComponent />
            </Box>
          </Flex>
          <Divider mx="auto" w="80%" />
          <ProductsListComponent />
        </Box>
        <Divider mx="auto" w="80%" />
        <ProductsPagination />
      </Grid>
    </Box>
  );
}
