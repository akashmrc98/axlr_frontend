import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../config/jwt";

export default function Navbar() {
  const navigate = useNavigate();
  function logout() {
    removeToken();
    navigate("/");
  }
  return (
    <Box>
      <Flex
        px={4}
        minH="10vh"
        boxShadow={"lg"}
        borderBottomRadius="md"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Box display={"flex"} columnGap="2rem">
          <Heading>Ecommerce</Heading>
          <Flex
            columnGap={"1rem"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <NavLink to="/products">
              {({ isActive }) => (
                <Button boxShadow={isActive ? `0px 0px 2px black` : `none`}>
                  Search
                </Button>
              )}
            </NavLink>

            <NavLink to="/upload">
              {({ isActive }) => (
                <Button boxShadow={isActive ? `0px 0px 2px black` : `none`}>
                  Upload
                </Button>
              )}
            </NavLink>
          </Flex>
        </Box>
        <Button onClick={logout} bg="red.300">
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
