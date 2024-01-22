
export class ProductSorting {

  static byPrice(products, order) {
    if (order === "asc")
      products.sort((a, b) => {
        return a.price - b.price
      })
    if (order === "desc")
      products.sort((a, b) => {
        return b.price - a.price
      })
    return products
  }

  static byRating(products, order) {
    if (order === "asc")
      products.sort((a, b) => {
        return a.rating - b.rating
      })
    if (order === "desc")
      products.sort((a, b) => {
        return b.rating - a.rating
      })
    return products
  }



}


