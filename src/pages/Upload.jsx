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

export default function Upload() {
  const itemsPerPage = 8;

  const toast = useToast();
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  useEffect(() => {
    const totalItems = products.length;
    const totalpages = totalItems / itemsPerPage;
    const _pages = [];
    for (let i = 1; i < totalpages; i++) _pages.push(i);
    setPages(_pages);
  }, [products]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post("http://localhost:3000/api/v1/products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authBearerHeader(),
          },
        })
        .then((res) => {
          toast({
            title: `${res.data.data.length} rows uploaded!`,
            description: "csv file successfully uploaded",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
            size: "lg",
          });
          setProducts(res.data.data);
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
  };

  return (
    <Box>
      <Navbar />
      <Grid py={6} px={24}>
        <Heading>Upload</Heading>
        <Grid py={4}>
          <Box>
            <FormControl>
              <FormLabel>File</FormLabel>
              <Input onChange={handleFileChange} type={"file"} />
            </FormControl>
            <Button mt={4} onClick={handleUpload}>
              Upload
            </Button>
          </Box>
        </Grid>
      </Grid>
      <UploadTableComponent
        products={products}
        startIndex={startIndex}
        endIndex={endIndex}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
