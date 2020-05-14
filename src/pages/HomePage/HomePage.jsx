import React from "react";
import axios from "axios";
import { Grid, Loader } from "semantic-ui-react";
import "./HomePage.scss";

// Components
import AlbumCard from "../../components/AlbumCard/AlbumCard.Component";

class HomePage extends React.Component {
  state = {
    albums: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    axios.get("http://localhost:5000/").then((res) => {
      this.setState({
        albums: res.data.sort((a, b) =>
          a.dateUpdated < b.dateUpdated ? 1 : -1
        ),
        loading: false,
      });
    });
  }

  sortAlbums = (sortMethod) => {
    const albums = this.state.albums;
    let sorted;

    switch (sortMethod) {
      case "oldest":
        sorted = albums.sort((a, b) => (a.year > b.year ? 1 : -1));
        break;

      case "newest":
        sorted = albums.sort((a, b) => (a.year < b.year ? 1 : -1));
        break;

      case "artist":
        sorted = albums.sort((a, b) => (a.artist > b.artist ? 1 : -1));
        break;

      case "album":
        sorted = albums.sort((a, b) => (a.album > b.album ? 1 : -1));
        break;

      case "dateUpdated":
        sorted = albums.sort((a, b) =>
          a.dateUpdated < b.dateUpdated ? 1 : -1
        );
        break;

      default:
        sorted = albums;
    }

    this.setState({
      albums: sorted,
    });
  };

  render() {
    const loadingMarkup = this.state.loading ? (
      <Loader content="Loading albums..." active />
    ) : (
      this.state.albums.map((doc) => (
        <Grid.Column key={doc.id} mobile={8} computer={4}>
          <AlbumCard
            key={doc.id}
            id={doc.id}
            artist={doc.artist}
            album={doc.album}
            year={doc.year}
            albumCover={doc.albumCover}
          />
        </Grid.Column>
      ))
    );
    return <Grid className="album-card__container">{loadingMarkup}</Grid>;
  }
}

export default HomePage;
