
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadPagination } from "./ProductsSlice"
import { ProductsServices } from "./ProductsServices"

export const useProductsPaginationHook = ({ page, query, rating, minPrice, maxPrice }) => {
  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.products.pagination)

  useEffect(() => {
    ProductsServices
      .getProductsPagination(page, query, rating, minPrice, maxPrice)
      .then(
        (resp) => {
          const _pagination = resp.data.pagination
          dispatch(loadPagination(_pagination))
        }
      )
      .catch((err) => { console.log(err) })
  }, [pagination.currentPage])
}
