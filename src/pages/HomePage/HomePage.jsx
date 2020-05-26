import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Grid, Loader, Dropdown } from "semantic-ui-react";
import "./HomePage.scss";

// Components
import AlbumCard from "../../components/AlbumCard/AlbumCard.Component";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [sortMethod, setSortMethod] = useState("");

  const fetchData = async () => {
    setLoading(true);

    const res = await axios.get("/");
    await setAlbums(res.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setAlbums(sortAlbums(sortMethod));
    setSortMethod("");
  }, [sortMethod]);

  const sortAlbums = (method) => {
    let sorted = [];

    switch (method) {
      case "oldest":
        sorted = albums.sort((a, b) => (a.year > b.year ? 1 : -1));
        break;

      case "newest":
        sorted = albums.sort((a, b) => (a.year < b.year ? 1 : -1));
        break;

      case "artist":
        sorted = albums.sort((a, b) => (a.artist > b.artist ? 1 : -1));
        break;

      case "album":
        sorted = albums.sort((a, b) => (a.album > b.album ? 1 : -1));
        break;

      case "lastUpdated":
        sorted = albums.sort((a, b) =>
          a.dateUpdated < b.dateUpdated ? 1 : -1
        );
        break;

      default:
        sorted = albums;
    }

    return sorted;
  };

  const sortStyle = {
    background: "#f4f4f4",
    padding: "1rem",
    display: "flex",
    width: "100vw",
    borderRadius: "0",
    border: "0",
  };

  const sortOptions = [
    {
      key: "oldest",
      value: "oldest",
      text: "oldest",
      content: "Oldest",
    },
    {
      key: "newest",
      value: "newest",
      text: "newest",
      content: "Newest",
    },
    {
      key: "artist",
      value: "artist",
      text: "artist",
      content: "Artist",
    },
    {
      key: "album",
      value: "album",
      text: "album",
      content: "Album",
    },
    {
      key: "lastUpdated",
      value: "lastUpdated",
      text: "lastUpdated",
      content: "Last Updated",
    },
  ];

  const loader = <Loader content="Loading albums..." active />;
  const sort = (
    <Dropdown
      text="Sort by"
      selection
      onChange={(event, data) => setSortMethod(data.value)}
      style={sortStyle}
      options={sortOptions}
    />
  );

  const albumGrid = albums.map((doc) => (
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
  ));

  const content = (
    <Fragment>
      {sort}
      {albumGrid}
    </Fragment>
  );

  return (
    <Grid className="album-card__container">{loading ? loader : content}</Grid>
  );
};

// class HomePage extends React.Component {
//   state = {
//     albums: [],
//     loading: false,
//   };

//   componentDidMount() {
//     this.setState({
//       loading: true,
//     });

//     axios.get("/").then((res) => {
//       this.setState({
//         albums: res.data.sort((a, b) =>
//           a.dateUpdated < b.dateUpdated ? 1 : -1
//         ),
//         loading: false,
//       });
//     });
//   }
// }

export default HomePage;
