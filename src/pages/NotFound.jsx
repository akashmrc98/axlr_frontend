import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container
      minH="100vh"
      alignItems={"center"}
      justifyContent="center"
      display={"grid"}
      rowGap="1rem"
      p={12}
    >
      <Box display={"grid"} rowGap="1rem">
        <Heading textAlign={"center"}>404 - Page Not Found</Heading>
        <Text textAlign={"center"}>
          Sorry, the page you are looking for could not be found.
        </Text>
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Button onClick={() => navigate("/")}>Home</Button>
        </Box>
      </Box>
    </Container>
  );
}
