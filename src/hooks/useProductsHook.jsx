import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import { authBearerHeader, removeToken } from "../config/jwt";

export function useProductsHook({ page, query, rating, minPrice, maxPrice }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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
        console.log(resp.data);
        setProducts([...resp.data.products]);
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
      });
  }

  return {
    products,
    setProducts,
    getProducts,
  };
}
