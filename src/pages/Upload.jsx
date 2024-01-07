import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { authBearerHeader } from "../config/jwt";

export default function Upload() {
  const itemsPerPage = 8;
  const toast = useToast();

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
    // Assuming you want to upload the file or perform some action with it
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
          console.log(res.data);
          setProducts(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box>
      <Navbar />
      <Grid py={6} px={24}>
        <Box display={"flex"} columnGap="2rem">
          <Heading>Upload</Heading>
        </Box>
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
      {products.length > 0 ? (
        <Grid>
          <TableContainer px={24}>
            <Table
              borderRadius={"xl"}
              boxShadow={"2xl"}
              variant={"striped"}
              colorScheme="teal"
            >
              <Thead borderRadius={"xl"}>
                <Tr borderRadius={"xl"}>
                  {["Title", "Price", "Rating"].map((t, i) => (
                    <Th key={i}>{t}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody borderRadius={"xl"}>
                {products.slice(startIndex, endIndex).map((t, i) => (
                  <Tr borderRadius={"xl"} key={i}>
                    <Td>{t.title.substring(0, 64)}...</Td>
                    <Td>{t.price}₹</Td>
                    <Td>
                      <Flex alignItems={"center"} columnGap=".24rem">
                        <Text>{t.rating}</Text>
                        <FaStar></FaStar>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Box my={12}>
            <Flex justifyContent={"space-evenly"}>
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                isDisabled={currentPage === 1}
                mr={2}
              >
                Previous
              </Button>
              <Flex columnGap=".4rem" rowGap={".4rem"}>
                {pages.slice(0, 10).map((p, i) => (
                  <Text
                    borderRadius={"xl"}
                    cursor={"pointer"}
                    minH="8"
                    minW="8"
                    bg={i !== currentPage ? "gray.200" : "black"}
                    color={i === currentPage ? "gray.200" : "black"}
                    p={1}
                    textAlign="center"
                    key={i}
                  >
                    {p}
                  </Text>
                ))}
              </Flex>
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                isDisabled={endIndex >= products.length}
              >
                Next
              </Button>
            </Flex>
          </Box>
        </Grid>
      ) : null}
    </Box>
  );
}
