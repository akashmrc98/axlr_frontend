import { Box, Divider, Flex, Grid, } from "@chakra-ui/react";

import Navbar from "../../components/common/Navbar";
import ProductsLoader from "../../components/products/ProductsLoader";
import ProductsSearchForm from "../../components/products/ProductsSearchForm";
import ProductsPagination from "../../components/products/ProductsPagination";
import ProductsFiltersForm from "../../components/products/ProductsFilterForm";
import ProductCountComponent from "../../components/products/ProductCountComponent";
import ProductsListComponent from "../../components/products/ProductsListComponent";
import ProductsSortingComponent from "../../components/products/ProductsSortingComponent";
import ProductsCategoryComponent from "../../components/products/ProductsCategoryComponent";

import { useProductsQuery } from "./useProductsQuery";
import { useProductsPaginationQuery } from "./useProductsPaginationQuery";

export default function Products() {

  const products = useProductsQuery()
  const pagination = useProductsPaginationQuery()

  return (
    <Box>
      <Navbar />
      <Grid
        gridTemplateColumns={{ base: "1fr ", lg: "2fr 9fr" }}
        px={4}
        py={4}
        h="100%"
      >
        {products.status === "success" &&
          <Box>
            <ProductsFiltersForm />
            <ProductsCategoryComponent />
          </Box>
        }
        <Box>
          <Flex w="80%" mx="auto" alignItems={"center"} justifyContent={"space-between"}>
            {products.status === "success" && <ProductCountComponent />}
            {products.status === "success" &&
              <Box py={4}>
                <ProductsSearchForm />
                <ProductsSortingComponent />
              </Box>
            }
          </Flex>
          <Divider mx="auto" w="80%" />
          {products.status === "pending" && <ProductsLoader />}
          {products.status === "success" && <ProductsListComponent />}
        </Box>
        <Divider mx="auto" w="80%" />
        {pagination.status === "pending" && <ProductsLoader />}
        {pagination.status === "success" && <ProductsPagination />}
      </Grid>
    </Box>

  )
}
