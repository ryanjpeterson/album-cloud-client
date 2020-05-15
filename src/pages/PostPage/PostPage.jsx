import React from "react";
import { Form, Button, Grid, Loader } from "semantic-ui-react";
import axios from "axios";

class PostPage extends React.Component {
  state = {
    artist: "",
    album: "",
    year: "",
    comment: "",
    genres: "",
    albumCover: undefined,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      uploadingPost: true,
    });

    const newAlbumPost = {
      artist: this.state.artist,
      album: this.state.album,
      year: this.state.year,
      comment: this.state.comment,
      genres: this.state.genres,
      uploadingPost: false,
    };

    let newPostId;

    await axios
      .post("/post", newAlbumPost)
      .then((res) => {
        newPostId = res.data.newPostId;

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

    const image = this.state.albumCover;
    await this.submitImage(newPostId, image);

    this.setState({
      uploadingPost: false,
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onImageChange = (event) => {
    this.setState({
      albumCover: event.target.files[0],
    });
  };

  submitImage = (docId, albumCover) => {
    const id = docId;
    const image = albumCover;

    const formData = new FormData();
    formData.append("image", image, image.name);

    axios
      .post(`/album/${id}/uploadAlbumCover`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const loader = <Loader content="Submitting post..." active />;
    const content = (
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
          <Form.Field>
            <label>Upload album cover:</label>
            <input
              onChange={this.onImageChange}
              type="file"
              placeholder="Upload album cover"
              required
            />
          </Form.Field>
          <Button color="teal">Submit</Button>
        </Form>
      </Grid.Column>
    );

    return <Grid container>{this.state.uploadingPost ? loader : content}</Grid>;
  }
}

export default PostPage;
