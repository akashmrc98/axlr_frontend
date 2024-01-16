import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filters: {
      rating: null,
      minPrice: null,
      maxPrice: null,
      sortByPrice: null,
      sortByRating: null
    },
    pagination: {
      totalProducts: null,
      totalPages: null,
      pages: [],
      currentPage: 1,
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
    filterProducts: (state, actions) => { }
  }
})

export const { loadProducts, loadPagination } = productsSlice.actions
export default productsSlice.reducer
