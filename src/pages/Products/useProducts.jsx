import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadProducts, productsErrorHandler } from "./ProductsSlice"
import { ProductsServices } from "./ProductsServices"

export const useProducts = ({ page, query, rating, minPrice, maxPrice }) => {

  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef(null)

  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.products.pagination)
  const filters = useSelector((state) => state.products.filters)

  useEffect(() => {
    const getproducts = async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
          abortControllerRef.current = new AbortController()
        }
        setLoading(true)

        const products = await ProductsServices
          .getProducts(
            page,
            query,
            rating,
            minPrice,
            maxPrice,
            abortControllerRef.signal
          )
        dispatch(loadProducts(products.data.products))
      }
      catch (err) {
        if (err.name === "AbortError") {
          console.log(err)
          return;
        }
        try {
          console.log(err)
        } catch (err) {

          console.log(err)
        }
      } finally {
        setLoading(false)
      }
    }

    getproducts()

  }, [pagination.currentPage, filters])

  return { loading }
}
