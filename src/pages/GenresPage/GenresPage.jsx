import React from "react";
import axios from "axios";
import { Grid, Loader } from "semantic-ui-react";

// Components
import GenreCard from "../../components/GenreCard/GenreCard.Component";

class GenresPage extends React.Component {
  state = {
    albums: [],
    genres: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const data = await axios.get("/").then((res) => res.data);

    const genres = data
      .map((el) => el.genres)
      .flat()
      .filter((el, i, arr) => arr.indexOf(el) === i);

    this.setState({
      genres: genres,
      albums: data,
      loading: false,
    });
  }

  render() {
    const loader = <Loader content="Loading genres..." active />;
    const content = this.state.genres.map((genre) => {
      return (
        <Grid.Column key={genre} mobile={8} computer={4}>
          <GenreCard genre={genre} />
        </Grid.Column>
      );
    });

    return (
      <Grid className="album-card__container">
        {this.state.loading ? loader : content}
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
