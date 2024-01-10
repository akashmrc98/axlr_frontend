import { useState } from "react";

export function useSortingHook({ products, setProducts }) {
  const [ratingSort, setRatingSort] = useState("asc");
  const [priceSort, setPriceSort] = useState("asc");

  function sortByRatings() {
    let p = products;
    if (ratingSort === "asc") {
      p = products.sort((a, b) => a.rating - b.rating);
      setProducts([...p]);
    }
    if (ratingSort === "desc") {
      p = products.sort((a, b) => b.rating - a.rating);
      setProducts([...p]);
    }
  }

  function sortByPrice() {
    let p = products;
    if (priceSort === "asc") {
      p = p.sort((a, b) => a.price - b.price);
      setProducts([...p]);
    }
    if (priceSort === "desc") {
      p = p.sort((a, b) => b.price - a.price);
      setProducts([...p]);
    }
  }

  return {
    sortByPrice,
    sortByRatings,
    ratingSort,
    setRatingSort,
    priceSort,
    setPriceSort,
  };
}
