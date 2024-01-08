import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { removeToken, setToken } from "../config/jwt";

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function login() {
    axios
      .post("http://localhost:3000/api/v1/users/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        const data = resp.data;
        if (!data.error) {
          setToken(data.token);
          navigate("/products");
        }
      })
      .catch((err) => {
        toast({
          title: `Oops!`,
          description: `${err.response.data.message}`,
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
          size: "lg",
        });
        setTimeout(() => {
          removeToken();
          navigate("/");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        return toast({
          title: `Internal Server Error`,
          description: "please try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          size: "lg",
        });
      });
  }

  return (
    <Container my={12} p={2} boxShadow={"lg"} borderRadius="md" h="100%">
      <Grid p={6} rowGap={".5rem"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={onEmailChange} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input value={password} onChange={onPasswordChange} type="password" />
        </FormControl>
        <Button onClick={login} mt={4} size="lg">
          Login
        </Button>
      </Grid>
    </Container>
  );
}
