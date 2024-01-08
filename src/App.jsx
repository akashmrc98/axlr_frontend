import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { theme } from "./config/theme";

import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
