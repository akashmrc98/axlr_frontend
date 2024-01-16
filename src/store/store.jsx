import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from '../pages/Products/ProductsSlice'

export const store = configureStore({
  reducer: {
    products: ProductsReducer
  }
})
