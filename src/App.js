import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.scss";

// Components
import Navbar from "./components/Navbar/Navbar.Component";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import PostPage from "./pages/PostPage/PostPage";
import LoginPage from "./pages/LoginPage/LoginPage";

axios.defaults.baseURL = "http://localhost:5000";

let FBIdToken;

class App extends React.Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    if (sessionStorage.FBIdToken) {
      FBIdToken = sessionStorage.FBIdToken;
      axios.defaults.headers.common["Authorization"] = FBIdToken;

      this.setState({
        authenticated: true,
      });
    }
  }

  render() {
    const { authenticated } = this.state;

    return (
      <Router>
        <Container fluid className="App">
          <Navbar authenticated={authenticated} />
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/album/:id"
            component={(props) => (
              <AlbumPage {...props} authenticated={authenticated} />
            )}
          />
          {authenticated ? (
            <Route
              exact
              path="/post"
              component={() => <PostPage authenticated={authenticated} />}
            />
          ) : (
            <Route exact path="/login" component={LoginPage} />
          )}
          <Redirect from="*" to="/" />
        </Container>
      </Router>
    );
  }
}

export default App;
