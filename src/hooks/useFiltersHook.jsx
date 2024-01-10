import { useState } from "react";

export function useFiltersHook() {
  const [rating, setRating] = useState(2);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(300000);

  return {
    query,
    setQuery,
    rating,
    setRating,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  };
}
