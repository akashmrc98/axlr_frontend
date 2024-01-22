import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  pagination: {
    pages: [],
    currentPage: 1,
    totalPages: null,
    totalProducts: null,
  },
  filters: {
    query: null,
    rating: null,
    minPrice: null,
    maxPrice: null,
    category: null
  },
  sort: {
    price: null,
    rating: null
  },
  setProducts: (products) => {
    set(() => ({
      products: [...products]
    }))
  },
  setPagination: (pagination) => {
    set(() => ({
      pagination: { ...pagination }
    }))
  },
  setFilters: (filters) => set({ filters: { ...filters } }),
}))
