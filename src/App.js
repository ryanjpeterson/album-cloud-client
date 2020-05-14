import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.scss";

// Components
import Navbar from "./components/Navbar/Navbar.Component";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import PostPage from "./pages/PostPage/PostPage";
import GenresPage from "./pages/GenresPage/GenresPage";

export default () => {
  return (
    <Router>
      <Container fluid className="App">
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/album/:id" component={AlbumPage} />
        <Route exact path="/genres" component={GenresPage} />
        <Route exact path="/post" component={PostPage} />
      </Container>
    </Router>
  );
};
