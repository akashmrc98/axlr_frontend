import { useNavigate } from "react-router";
import axios from "axios";

import { useState } from "react";
import { authBearerHeader, removeToken } from "../config/jwt";

export function useProductsUploadHook() {

  const itemsPerPage = 8;

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const totalItems = products.length;
  const totalpages = totalItems / itemsPerPage;


  const pages = [];
  for (let i = 1; i < totalpages; i++) _pages.push(i);

  const handleProductFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleProductsFileUpload = () => {
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
          setProducts(res.data.data);
        })
        .catch((err) => {
          setTimeout(() => {
            removeToken();
            navigate("/");
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  return {
    products,
    totalpages,
    handleProductFileChange,
    handleProductsFileUpload,
    currentPage,
    setCurrentPage,
    pages,
  }


}
