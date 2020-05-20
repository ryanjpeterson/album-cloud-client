import React, { useState } from "react";
import { Form, Button, Grid, Loader } from "semantic-ui-react";
import axios from "axios";

const PostPage = () => {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [comment, setComment] = useState("");
  const [genres, setGenres] = useState("");
  const [albumCover, setAlbumCover] = useState(undefined);
  const [uploadingPost, setUploadingPost] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    setUploadingPost(true);

    let newPostId;

    const newAlbumPost = {
      artist: artist,
      album: album,
      year: year,
      comment: comment,
      genres: genres,
    };

    const imageData = new FormData();
    imageData.append("image", albumCover, albumCover.name);

    await axios
      .post("/post", newAlbumPost)
      .then((res) => {
        newPostId = res.data.newPostId;

        setArtist("");
        setAlbum("");
        setYear("");
        setComment("");
        setGenres("");
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });

    await axios
      .post(`/album/${newPostId}/uploadAlbumCover`, imageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });

    setUploadingPost(false);
  };

  const loader = <Loader content="Submitting post..." active />;
  const content = (
    <Grid.Column>
      <Form onSubmit={onSubmit}>
        <h1>Post an album</h1>
        <Form.Field>
          <label>Artist:</label>
          <input
            onChange={(event) => setArtist(event.target.value)}
            name="artist"
            placeholder="Artist"
            value={artist}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Album:</label>
          <input
            onChange={(event) => setAlbum(event.target.value)}
            name="album"
            placeholder="Album"
            value={album}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Year:</label>
          <input
            onChange={(event) => setYear(event.target.value)}
            name="year"
            placeholder="Year"
            value={year}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Comment:</label>
          <input
            onChange={(event) => setComment(event.target.value)}
            name="comment"
            placeholder="Comment"
            value={comment}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Genres:</label>
          <input
            onChange={(event) => setGenres(event.target.value)}
            name="genres"
            placeholder="Genres - Separate with a comma"
            value={genres}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Upload album cover:</label>
          <input
            onChange={(event) => setAlbumCover(event.target.files[0])}
            type="file"
            placeholder="Upload album cover"
            required
          />
        </Form.Field>
        <Button color="teal">Submit</Button>
      </Form>
    </Grid.Column>
  );

  return <Grid container>{uploadingPost ? loader : content}</Grid>;
};

export default PostPage;
