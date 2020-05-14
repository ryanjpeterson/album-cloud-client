import React from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import "./HomePage.scss";

// Components
import AlbumCard from "../../components/AlbumCard/AlbumCard.Component";

class HomePage extends React.Component {
  state = {
    albums: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/").then((res) => {
      this.setState({
        albums: res.data,
      });
    });
  }

  render() {
    return (
      <Grid className="album-card__container">
        {this.state.albums.map((doc) => {
          return (
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
          );
        })}
      </Grid>
    );
  }
}

export default HomePage;
