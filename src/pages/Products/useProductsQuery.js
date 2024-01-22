import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "./useProductStore";
import { authBearerHeader } from "../../config/jwt";
import { ProductsApi } from "./ProductsApi";

export const useProductsQuery = () => {

  const { setProducts, pagination, filters, sort } = useProductStore((state) => state)

  return useQuery({
    suspense: false,
    keepPreviousData: true,
    initialData: [],
    queryKey: ['products', pagination.currentPage, filters],
    queryFn: async ({ signal }) => {
      try {
        if (pagination && filters) {
          const params = {
            page: pagination.currentPage,
            query: filters.query,
            rating: filters.rating,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice
          }
          const response = await axios
            .get(`http://localhost:3000/api/v1/products/`, {
              params,
              signal,
              headers: {
                Authorization: authBearerHeader(),
              },
            });
          ProductsApi.sortProductsByRating(response.data.products, sort.rating)
          ProductsApi.sortProductsByPrice(response.data.products, sort.price)
          setProducts([...response.data.products])
          return [...response.data.products]
        }
        return []
      } catch (e) {
        console.log(e)
        return []
      }
    }
  });
}

