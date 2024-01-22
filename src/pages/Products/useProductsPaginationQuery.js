import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "./useProductStore";
import { authBearerHeader } from "../../config/jwt";

export const useProductsPaginationQuery = () => {

  const { pagination, filters, setPagination } = useProductStore((state) => state)

  return useQuery({
    initialData: { ...pagination },
    queryKey: ['pagination', filters],
    queryFn: async ({ signal }) => {
      try {
        if (pagination && filters) {
          const params = {
            page: pagination.currentPage,
            query: filters.query,
            rating: filters.rating,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            category: filters.category
          }
          const response = await axios
            .get(`http://localhost:3000/api/v1/products/pagination`, {
              params,
              signal,
              headers: {
                Authorization: authBearerHeader(),
              },
            });
          setPagination({ ...response.data.pagination })
          return { ...response.data.pagination }
        }
        return {}
      } catch (e) {
        console.log(e)
        return {};
      }
    }
  });
}


