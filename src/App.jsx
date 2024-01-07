import Login from "./pages/Login";

import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Upload from "./pages/Upload";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/products",
    element: <ProtectedRoute element={<Products />} />,
  },
  {
    path: "/upload",
    element: <ProtectedRoute element={<Upload />} />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
