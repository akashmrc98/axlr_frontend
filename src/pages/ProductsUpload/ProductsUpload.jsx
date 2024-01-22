import { Box, Container } from "@chakra-ui/react";

import Navbar from "../../components/common/Navbar";
import ProductsUploadForm from "../../components/productsUpload/ProductsUploadForm";
import ProductsUploadedTable from "../../components/productsUpload/ProductsUploadedTable";
import ProductsUploadedPagination from "../../components/productsUpload/productsUploadedPagination";

export default function ProductsUpload() {

  return (
    <Box>
      <Navbar />
      <ProductsUploadForm />
      <ProductsUploadedTable />
      <ProductsUploadedPagination />
    </Box>
  );
}
