import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadPagination, loadProducts } from "./ProductsSlice"
import { ProductsServices } from "./ProductsServices"

export const useProductsHooks = ({ page, query, rating, minPrice, maxPrice }) => {

  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.products.pagination)
  const filters = useSelector((state) => state.products.filters)

  useEffect(() => {
    ProductsServices
      .getProducts(page, query, rating, minPrice, maxPrice)
      .then(
        (resp) => {
          const products = resp.data.products
          dispatch(loadProducts(products))
        }
      )
      .catch((err) => { console.log(err) })

    ProductsServices
      .getProductsPagination(page, query, rating, minPrice, maxPrice)
      .then(
        (resp) => {
          const _pagination = resp.data.pagination
          dispatch(loadPagination(_pagination))
        }
      )
      .catch((err) => { console.log(err) })

  }, [pagination.currentPage, filters])

}
