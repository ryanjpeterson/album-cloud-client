import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "semantic-ui-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    axios
      .post("/login", formData)
      .then((res) => {
        const FBIdToken = res.data.token;
        sessionStorage.setItem("FBIdToken", `Bearer ${FBIdToken}`);
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container style={{ marginTop: "3rem" }}>
      <Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Form.Field>
          <label>Email:</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Field>
        <Button color="teal" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
