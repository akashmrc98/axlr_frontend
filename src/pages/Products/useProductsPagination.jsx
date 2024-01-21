import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadPagination, } from "./ProductsSlice"
import { ProductsServices } from "./ProductsServices"

export const useProductsPagination = ({ page, query, rating, minPrice, maxPrice }) => {

  const [loading, setLoading] = useState(false)

  const abortControllerRef = useRef(null)

  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.products.pagination)
  const filters = useSelector((state) => state.products.filters)

  useEffect(() => {
    const getProductsPagination = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = new AbortController()
      }

      setLoading(true)

      try {
        const _pagination = await ProductsServices
          .getProductsPagination(
            page,
            query,
            rating,
            minPrice,
            maxPrice,
            abortControllerRef.signal
          )
        dispatch(loadPagination(_pagination.data.pagination))
      }
      catch (err) {
        if (err.name === "AbortError") return;
        try {
          console.log(err)
        } catch (err) {
          console.log(err)
        }
      } finally {
        setLoading(false)
      }
    }
    getProductsPagination()

  }, [pagination.currentPage, filters])

  return { loading }

}
