import axios from "axios";
import { authBearerHeader } from "../../config/jwt";

export class ProductsServices {

  static async getProductsPagination(page, query, rating, minPrice, maxPrice) {
    try {
      return await axios
        .get(`http://localhost:3000/api/v1/products/pagination`, {
          params: {
            page,
            query,
            rating,
            minPrice,
            maxPrice,
          },
          headers: {
            Authorization: authBearerHeader(),
          },
        })
    } catch (err) {
      return err;
    }
  }

  static async getProducts(page, query, rating, minPrice, maxPrice) {
    try {
      return await axios
        .get(`http://localhost:3000/api/v1/products/`, {
          params: {
            page,
            query,
            rating,
            minPrice,
            maxPrice,
          },
          headers: {
            Authorization: authBearerHeader(),
          },
        });
    } catch (err) {
      return err
    }
  }
}

