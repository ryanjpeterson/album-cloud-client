import React from "react";
import { Item } from "semantic-ui-react";

const GenreCard = ({ genre, genreAlbums }) => {
  return (
    <Item>
      <Item.Header>{genre}</Item.Header>
    </Item>
  );
};

export default GenreCard;
