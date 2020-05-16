import React, { Fragment } from "react";
import axios from "axios";
import { Grid, Image, Item, Button, Loader } from "semantic-ui-react";
import "./AlbumPage.scss";

import MyBtn from "../../components/MyBtn/MyBtn.Component";
import EditAlbumInfo from "../../components/EditAlbumInfo/EditAlbumInfo.Component";

class AlbumPage extends React.Component {
  state = {
    id: "",
    artist: "",
    album: "",
    year: "",
    comment: "",
    genres: [],
    albumCover: "",
    loading: false,
    uploadingImage: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const id = this.props.match.params.id;
    await axios.get(`/album/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        artist: res.data.artist,
        album: res.data.album,
        year: res.data.year,
        comment: res.data.comment,
        genres: res.data.genres,
        albumCover: res.data.albumCover,
      });
    });

    this.setState({
      loading: false,
    });
  }

  handleClick = () => {
    const imageUpload = document.getElementById("imageInput");
    imageUpload.click();
  };

  handleSubmit = async (event) => {
    this.setState({
      uploadingImage: true,
    });

    const image = event.target.files[0];
    const id = this.state.id;

    const formData = new FormData();
    formData.append("image", image, image.name);

    axios
      .post(`/album/${id}/uploadAlbumCover`, formData)
      .then((res) => {
        this.setState({
          albumCover: res.data.imageUrl,
          uploadingImage: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const columnStyle = {
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const authenticated = this.props.authenticated;
    const editAlbumCoverBtn = (
      <Fragment>
        <input
          hidden
          type="file"
          name="image"
          id="imageInput"
          onChange={this.handleSubmit}
        />
        <Button style={{ marginTop: "1rem" }} onClick={this.handleClick}>
          Edit Cover
        </Button>
      </Fragment>
    );

    const editAlbumInfoBtn = (
      <EditAlbumInfo
        id={this.state.id}
        artist={this.state.artist}
        album={this.state.album}
        comment={this.state.comment}
        year={this.state.year}
        genres={this.state.genres}
        albumCover={this.state.albumCover}
      />
    );

    const loader = <Loader content="Loading album..." active />;
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
          {this.state.uploadingImage ? (
            <Loader content="Uploading cover..." active />
          ) : (
            <Fragment>
              <Image
                size="large"
                src={this.state.albumCover}
                alt={this.state.album}
              />
              {authenticated ? editAlbumCoverBtn : null}
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
              <h1>{this.state.artist}</h1>
            </Item.Header>
            <Item.Description>
              <h2>{this.state.album}</h2>
              <h3>{this.state.year}</h3>
              {this.state.genres.map((genre) => {
                return <MyBtn color="teal" key={genre} genre={genre} />;
              })}
              <p style={{ margin: "3rem 0 1rem 0" }}>{this.state.comment}</p>
            </Item.Description>
          </Item>
          {authenticated ? editAlbumInfoBtn : null}
        </Grid.Column>
      </Fragment>
    );

    return <Grid>{this.state.loading ? loader : content}</Grid>;
  }
}

export default AlbumPage;
