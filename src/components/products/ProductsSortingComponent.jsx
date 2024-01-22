import { useState } from "react";

import { Flex, Tag } from "@chakra-ui/react";
import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import { ProductSorting } from '../../pages/Products/ProductSorting'
import { useProductStore } from "../../pages/Products/useProductStore";


export default function ProductsSortingComponent() {

  const { setProducts, products } = useProductStore((state) => state)

  const [priceSort, setPriceSort] = useState("asc")
  const [ratingSort, setRatingSort] = useState("asc")

  function sortByPrice() {
    if (priceSort === "asc") setPriceSort("desc");
    else if (priceSort === "desc") setPriceSort("asc");
    else setPriceSort("asc");
    setProducts(ProductSorting.byPrice(products, priceSort))

  }
  function sortByRatings() {
    if (ratingSort === "asc") setRatingSort("desc");
    else if (ratingSort === "desc") setRatingSort("asc");
    else setRatingSort("asc");
    setProducts(ProductSorting.byRating(products, ratingSort))
  }

  return <Flex columnGap={".5rem"} alignItems="center">
    <Tag
      onClick={sortByPrice}
      cursor={"pointer"}
      display="flex"
      alignItems={"center"}
      columnGap=".5rem"
    >
      Price
      {priceSort === "asc" ? <GoSortAsc /> : null}
      {priceSort === "desc" ? <GoSortDesc /> : null}
    </Tag>
    <Tag
      onClick={sortByRatings}
      cursor={"pointer"}
      display="flex"
      alignItems={"center"}
      columnGap=".5rem"
    >
      Rating
      {ratingSort === "asc" ? <GoSortAsc /> : null}
      {ratingSort === "desc" ? <GoSortDesc /> : null}
    </Tag>
  </Flex>
} 
