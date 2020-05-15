import React from "react";
import axios from "axios";
import { Container, Form, Button } from "semantic-ui-react";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", formData)
      .then((res) => {
        const FBIdToken = res.data.token;
        localStorage.setItem("FBIdToken", `Bearer ${FBIdToken}`);
        console.log(FBIdToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container style={{ marginTop: "3rem" }}>
        <Form onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <Form.Field>
            <label>Email:</label>
            <input
              onChange={this.onChange}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input
              onChange={this.onChange}
              name="password"
              type="password"
              placeholder="Email"
              required
            />
          </Form.Field>
          <Button color="teal" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginPage;
