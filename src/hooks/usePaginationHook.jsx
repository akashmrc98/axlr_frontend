import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { authBearerHeader, removeToken } from "../config/jwt";

export function usePaginationHook({
  query,
  rating,
  minPrice,
  maxPrice,
  LIMIT,
}) {
  const toast = useToast();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [results, setResults] = useState("");
  const [pagination, setPagination] = useState({
    totalProducts: 1,
    totalPages: 1,
    pages: [],
    currentPage: 1,
  });

  function getPagination() {
    axios
      .get(`http://localhost:3000/api/v1/products/pagination`, {
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
        setPagination(resp.data.pagination);
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

  useEffect(() => {
    setResults(
      `Showing page ${page}-${pagination.totalPages}, ${page * LIMIT - 39}-${
        page * LIMIT
      } Results of ${pagination.pages.length * LIMIT}.`
    );
  }, [LIMIT, page, pagination.pages.length, pagination.totalPages]);

  return {
    page,
    setPage,
    results,
    pagination,
    setPagination,
    getPagination,
  };
}
