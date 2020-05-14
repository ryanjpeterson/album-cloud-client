import React from "react";
import { Link } from "react-router-dom";
import { Image, Item } from "semantic-ui-react";

import "./AlbumCard.scss";

const AlbumCard = (props) => {
  const { id, artist, album, year, albumCover } = props;

  return (
    <Item className="album-card">
      <Link to={`/album/${id}`}>
        <Image className="album-card__image" src={albumCover} alt={album} />
      </Link>
      <Item.Description className="album-card__content">
        <Item.Header>
          <h3>{artist}</h3>
        </Item.Header>
        <p>{album}</p>
        <p>{year}</p>
      </Item.Description>
    </Item>
  );
};

export default AlbumCard;
