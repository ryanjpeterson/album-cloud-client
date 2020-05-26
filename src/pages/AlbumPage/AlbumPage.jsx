import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Grid, Image, Item, Button, Loader } from "semantic-ui-react";
import "./AlbumPage.scss";

import MyBtn from "../../components/MyBtn/MyBtn.Component";
import EditAlbumInfo from "../../components/EditAlbumInfo/EditAlbumInfo.Component";

const AlbumPage = ({ match, authenticated }) => {
  const id = match.params.id;

  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [comment, setComment] = useState("");
  const [genres, setGenres] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    await axios
      .get(`/album/${id}`)
      .then((res) => {
        setArtist(res.data.artist);
        setAlbum(res.data.album);
        setYear(res.data.year);
        setComment(res.data.comment);
        setGenres(res.data.genres);
        setAlbumCover(res.data.albumCover);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputClick = () => {
    const imageUpload = document.getElementById("imageInput");
    imageUpload.click();
  };

  const handleSubmit = (event) => {
    setUploadingImage(true);

    const image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image, image.name);

    axios
      .post(`/album/${id}/uploadAlbumCover`, formData)
      .then((res) => {
        setAlbumCover(res.data.imageUrl);
        setUploadingImage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    setLoading(false);

    axios
      .delete(`/album/${id}`)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err);
      });

    setLoading(false);
  };

  const columnStyle = {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
  };

  const btnStyle = {
    display: "flex",
    flexFlow: "row wrap",
  };

  const editAlbumCoverBtn = authenticated ? (
    <Fragment>
      <input
        hidden
        type="file"
        name="image"
        id="imageInput"
        onChange={handleSubmit}
      />
      <Button style={{ marginTop: "1rem" }} onClick={handleInputClick}>
        Edit Cover
      </Button>
    </Fragment>
  ) : null;

  const editAlbumInfoBtn = authenticated ? (
    <EditAlbumInfo
      id={id}
      artist={artist}
      album={album}
      comment={comment}
      year={year}
      genres={genres}
      albumCover={albumCover}
    />
  ) : null;

  const deleteAlbumBtn = authenticated ? (
    <Button color="red" onClick={handleDelete}>
      Delete Album
    </Button>
  ) : null;

  const loader = <Loader content="Loading..." active />;
  const content = (
    <Fragment>
      <Grid.Column
        as="div"
        color="teal"
        className="grid-column"
        mobile={16}
        tablet={10}
        computer={8}
        style={columnStyle}
      >
        {uploadingImage ? (
          <Loader content="Uploading cover..." active />
        ) : (
          <Fragment>
            <Image size="large" src={albumCover} alt={album} />
            {editAlbumCoverBtn}
          </Fragment>
        )}
      </Grid.Column>
      <Grid.Column
        as="div"
        className="grid-column album-info"
        mobile={16}
        tablet={6}
        computer={8}
        textAlign="center"
        style={columnStyle}
      >
        <Item>
          <Item.Header>
            <h1>{artist}</h1>
          </Item.Header>
          <Item.Description>
            <h2>{album}</h2>
            <h3>{year}</h3>
            {genres.map((genre) => {
              return <MyBtn color="teal" key={genre} genre={genre} />;
            })}
            <p style={{ margin: "3rem 0 1rem 0" }}>{comment}</p>
          </Item.Description>
        </Item>
        <div style={btnStyle}>
          {editAlbumInfoBtn}
          {deleteAlbumBtn}
        </div>
      </Grid.Column>
    </Fragment>
  );

  return <Grid>{loading ? loader : content}</Grid>;
};

export default AlbumPage;
