import React from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";

// Components
import GenreCard from "../../components/GenreCard/GenreCard.Component";

class GenresPage extends React.Component {
  state = {
    albums: [],
    genres: [],
  };

  async componentDidMount() {
    const data = await axios
      .get("http://localhost:5000/")
      .then((res) => res.data);

    const genres = data
      .map((el) => el.genres)
      .flat()
      .filter((el, i, arr) => arr.indexOf(el) === i);

    this.setState({
      genres: genres,
      albums: data,
    });
  }

  render() {
    const columnStyle = {
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <Grid>
        {this.state.genres.map((genre) => {
          return <GenreCard genre={genre} />;
        })}
      </Grid>
    );
  }
}

export default GenresPage;

// genres: {
//     postPunk: {
//         genre: 'Post-Punk',
//         albums: [
//             {
//                 artist: 'refused'
//             }
//         ]
//     }
// };
