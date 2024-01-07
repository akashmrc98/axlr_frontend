import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Text,
} from "@chakra-ui/react";

import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router";
import { setToken } from "../config/jwt";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
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
          setError(false);
          setMessage("");
          setToken(data.token);
          navigate("/products");
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.message);
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
        {error ? <Text color="red.400">{message}</Text> : null}
        <Button onClick={login} mt={4} size="lg">
          Login
        </Button>
      </Grid>
    </Container>
  );
}
