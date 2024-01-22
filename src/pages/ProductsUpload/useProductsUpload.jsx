
import axios from "axios";
import { useNavigate } from "react-router";
import { useProductUploadStore } from "./useProductsUploadStore";
import { authBearerHeader, removeToken } from "../../config/jwt";

export function useProductsUploadMutation() {

  const navigate = useNavigate();
  const { setProducts, pagination, setPagination } = useProductUploadStore((state) => state)

  const uploadFile = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios
        .post("http://localhost:3000/api/v1/products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authBearerHeader(),
          },
        })
      const products = response.data.data
      setProducts([...products]);

      const ITEMS_PER_VIEW = 8
      const totalProducts = products.length;
      const totalPages = totalProducts / ITEMS_PER_VIEW;
      const pages = [];
      for (let i = 1; i < totalPages; i++) pages.push(i);
      setPagination({
        ...pagination,
        pages,
        currentPage: 1,
        totalPages,
        totalProducts,
      })

      return [...res.data.data]
    } catch (err) {
      console.log(err)
      setTimeout(() => {
        removeToken();
        navigate("/");
      }, 5000);
    }
  }
  return { uploadFile };
};


