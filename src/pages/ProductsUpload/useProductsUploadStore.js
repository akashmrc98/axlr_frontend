import { create } from 'zustand'

export const useProductUploadStore = create((set) => ({
  products: [],
  pagination: {
    pages: [],
    currentPage: 1,
    totalPages: null,
    totalProducts: null,
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
}))
