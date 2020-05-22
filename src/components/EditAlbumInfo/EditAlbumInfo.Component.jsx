import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "semantic-ui-react";

const EditAlbumInfo = (props) => {
  const [id, setId] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [comment, setComment] = useState("");
  const [genres, setGenres] = useState([]);
  const [albumCover, setAlbumCover] = useState("");

  useEffect(() => {
    setId(props.id);
    setArtist(props.artist);
    setAlbum(props.album);
    setYear(props.year);
    setComment(props.comment);
    setGenres(props.genres);
    setAlbumCover(props.albumCover);
  }, [props]);

  const onSubmit = () => {
    axios
      .post(`/album/${id}/editAlbumInfo`, {
        id,
        artist,
        album,
        year,
        comment,
        genres,
        albumCover,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal trigger={<Button>Edit Info</Button>}>
      <Modal.Header>Edit Album Info</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            onChange={(event) => setArtist(event.target.value)}
            value={artist}
            placeholder="Artist"
            name="artist"
            required
          />
          <Form.Input
            onChange={(event) => setAlbum(event.target.value)}
            value={album}
            placeholder="Album"
            name="album"
            required
          />
          <Form.Input
            onChange={(event) => setYear(event.target.value)}
            value={year}
            placeholder="Year"
            name="year"
            required
          />
          <Form.Input
            onChange={(event) => setGenres(event.target.value)}
            value={genres}
            placeholder="Genres"
            name="genres"
            required
          />
          <Form.Input
            onChange={(event) => setComment(event.target.value)}
            value={comment}
            placeholder="Comment"
            name="comment"
            required
          />
          <Form.Input
            onChange={(event) => setAlbumCover(event.target.value)}
            value={albumCover}
            placeholder="Album Cover URL"
            name="albumCover"
            required
          />
          <Button color="teal" onClick={onSubmit}>
            Save Changes
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditAlbumInfo;
