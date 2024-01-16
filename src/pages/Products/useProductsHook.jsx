import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadProducts } from "./ProductsSlice"
import { ProductsServices } from "./ProductsServices"

export const useProductsHooks = ({ page, query, rating, minPrice, maxPrice }) => {

  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.products.pagination)

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
  }, [pagination.currentPage])
}
