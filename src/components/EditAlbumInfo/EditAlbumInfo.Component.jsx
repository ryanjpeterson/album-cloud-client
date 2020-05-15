import React from "react";
import axios from "axios";
import { Form, Button, Modal } from "semantic-ui-react";

class EditAlbumInfo extends React.Component {
  state = {
    id: "",
    artist: "",
    album: "",
    year: "",
    comments: "",
    genres: "",
    albumCover: "",
  };

  componentDidMount() {
    this.setState({
      id: this.props.id,
      artist: this.props.artist,
      album: this.props.album,
      year: this.props.year,
      comment: this.props.comment,
      genres: this.props.genres,
      albumCover: this.props.albumCover,
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     id: nextProps.id,
  //     artist: nextProps.artist,
  //     album: nextProps.album,
  //     year: nextProps.year,
  //     comment: nextProps.comment,
  //     genres: nextProps.genres,
  //     albumCover: nextProps.albumCover,
  //   });
  // }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/album/${this.state.id}/editAlbumInfo`, {
        id: this.state.id,
        artist: this.state.artist,
        album: this.state.album,
        year: this.state.year,
        comment: this.state.comment,
        genres: this.state.genres,
        albumCover: this.state.albumCover,
        modalOpen: false,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Modal trigger={<Button>Edit Info</Button>}>
        <Modal.Header>Edit Album Info</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              onChange={this.handleChange}
              value={this.state.artist}
              placeholder="Artist"
              name="artist"
              required
            />
            <Form.Input
              onChange={this.handleChange}
              value={this.state.album}
              placeholder="Album"
              name="album"
              required
            />
            <Form.Input
              onChange={this.handleChange}
              value={this.state.year}
              placeholder="Year"
              name="year"
              required
            />
            <Form.Input
              onChange={this.handleChange}
              value={this.state.genres}
              placeholder="Genres"
              name="genres"
              required
            />
            <Form.Input
              onChange={this.handleChange}
              value={this.state.comment}
              placeholder="Comment"
              name="comment"
              required
            />
            <Form.Input
              onChange={this.handleChange}
              value={this.state.albumCover}
              placeholder="Album Cover URL"
              name="albumCover"
              required
            />
            <Button color="teal" onClick={this.onSubmit}>
              Save Changes
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditAlbumInfo;
