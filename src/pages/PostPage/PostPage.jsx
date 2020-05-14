import React from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import axios from "axios";

class PostPage extends React.Component {
  state = {
    artist: "",
    album: "",
    year: "",
    comment: "",
    genres: "",
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newAlbumPost = {
      artist: this.state.artist,
      album: this.state.album,
      year: this.state.year,
      comment: this.state.comment,
      genres: this.state.genres,
    };

    axios
      .post("/post", newAlbumPost)
      .then((res) => {
        console.log(res);

        this.setState({
          artist: "",
          album: "",
          year: "",
          comment: "",
          genres: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Grid container>
        <Grid.Column>
          <Form onSubmit={this.onSubmit}>
            <h1>Post an album</h1>
            <Form.Field>
              <label>Artist:</label>
              <input
                onChange={this.onChange}
                name="artist"
                placeholder="Artist"
                value={this.state.artist}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Album:</label>
              <input
                onChange={this.onChange}
                name="album"
                placeholder="Album"
                value={this.state.album}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Year:</label>
              <input
                onChange={this.onChange}
                name="year"
                placeholder="Year"
                value={this.state.year}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Comment:</label>
              <input
                onChange={this.onChange}
                name="comment"
                placeholder="Comment"
                value={this.state.comment}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Genres:</label>
              <input
                onChange={this.onChange}
                name="genres"
                placeholder="Genres - Separate with a comma"
                value={this.state.genres}
                required
              />
            </Form.Field>
            <Button color="teal">Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default PostPage;
