import { Provider } from 'react-redux'
import { ChakraProvider } from "@chakra-ui/react";

import { store } from './store/store';
import { theme } from "./config/theme";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Upload from "./pages/Upload";
import Products from "./pages/Products/Products";

import ProtectedRoute from "./components/common/ProtectedRoute";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
