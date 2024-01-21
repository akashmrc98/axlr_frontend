import { combineSlices, createSlice } from '@reduxjs/toolkit'

const commonDataBuilder = (data) => {
  return {
    data: data,
    error: {
      error: false,
      message: null,
      status: null,
      optional: null
    }
  }
}


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: commonDataBuilder([]),
    pagination: commonDataBuilder({
      totalProducts: null,
      totalPages: null,
      pages: [],
      currentPage: 1,
    }),
    filters: {
      query: null,
      rating: null,
      minPrice: null,
      maxPrice: null,
    },
    sort: {
      price: "asc",
      rating: "asc"
    }
  },
  reducers: {
    loadProducts: (state, actions) => {
      return { ...state, products: { data: [...actions.payload] } }
    },
    productsErrorHandler: (state, actions) => {
      return {
        ...state, products: {
          ...state.products,
          error: {
            error: true,
            status: actions.payload.status,
            message: actions.payload.message,
            optional: actions.payload.err
          }
        }
      }
    },
    loadPagination: (state, actions) => {
      return {
        ...state, pagination: { data: { ...actions.payload } }
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
        products: { data: [...products] }
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
        products: { data: [...products] }
      }
    },
  },
})

export const { loadProducts, loadPagination, filterProducts, sortProductsByPrice, sortProductsByRatings, productsErrorHandler } = productsSlice.actions
export default productsSlice.reducer
