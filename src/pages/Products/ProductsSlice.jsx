import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filters: {
      query: null,
      rating: null,
      minPrice: null,
      maxPrice: null,
    },
    pagination: {
      totalProducts: null,
      totalPages: null,
      pages: [],
      currentPage: 1,
    },
    sort: {
      price: "asc",
      rating: "asc"
    }
  },
  reducers: {
    loadProducts: (state, actions) => {
      return { ...state, products: [...actions.payload] }
    },
    loadPagination: (state, actions) => {
      return {
        ...state, pagination: { ...actions.payload }
      }
    },
    filterProducts: (state, actions) => {
      console.log(actions)
      return {
        ...state, filters: { ...actions.payload }
      }
    },
    sortProductsByPrice: (state, actions) => {
      const products = [...state.products]
      if (actions.payload === "asc") {
        products.sort((a, b) => {
          return a.price - b.price
        })
      }
      if (actions.payload === "desc") {
        products.sort((a, b) => {
          return b.price - a.price
        })
      }
      return {
        ...state,
        sort: {
          ...state.sort,
          price: actions.payload,
        },
        products: [...products]
      }
    },
    sortProductsByRatings: (state, actions) => {
      const products = [...state.products]
      if (actions.payload === "asc") {
        products.sort((a, b) => {
          return a.rating - b.rating
        })
      }
      if (actions.payload === "desc") {
        products.sort((a, b) => {
          return b.rating - a.rating
        })
      }
      return {
        ...state,
        sort: {
          ...state.sort,
          rating: actions.payload,
        },
        products: [...products]
      }
    },
  },
})

export const { loadProducts, loadPagination, filterProducts, sortProductsByPrice, sortProductsByRatings } = productsSlice.actions
export default productsSlice.reducer
