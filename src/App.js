import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.scss";

// Firebase
import firebase from "firebase";

// Components
import Navbar from "./components/Navbar/Navbar.Component";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import PostPage from "./pages/PostPage/PostPage";
import GenresPage from "./pages/GenresPage/GenresPage";
import LoginPage from "./pages/LoginPage/LoginPage";

axios.defaults.baseURL = "http://localhost:5000";

let FBIdToken;

if (localStorage.FBIdToken) {
  FBIdToken = localStorage.FBIdToken;
  axios.defaults.headers.common["Authorization"] = FBIdToken;
} else {
  console.log("No");
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Container fluid className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/album/:id" component={AlbumPage} />
          <Route exact path="/genres" component={GenresPage} />
          <Route exact path="/post" component={PostPage} />
          <Route exact path="/login" component={LoginPage} />
        </Container>
      </Router>
    );
  }
}

export default App;
