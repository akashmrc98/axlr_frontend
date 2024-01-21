import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { authBearerHeader, removeToken } from "../config/jwt";

import Navbar from "../components/common/Navbar";
import UploadTableComponent from "../components/upload/UploadTableComponent";
import ProductsUploadForm from "../../components/productsUpload/ProductsUploadForm";
import ProductsUploadedTable from "../../components/productsUpload/ProductsUploadedTable";
import ProductsUploadedPagination from "../../components/productsUpload/productsUploadedPagination";
import { useProductsUploadHook } from "./useProductsUploadHook";

export default function ProductsUpload() {

  const
    {
      totalpages,
      handleProductFileChange,
      handleProductsFileUpload,
      products,
      currentPage,
      setCurrentPage,
      pages,
    } = useProductsUploadHook()

  return (
    <Box>
      <Navbar />
      <ProductsUploadForm />
      <ProductsUploadedTable
        products={products}
      />
      <ProductsUploadedPagination
        products={products}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </Box>
  );
}
