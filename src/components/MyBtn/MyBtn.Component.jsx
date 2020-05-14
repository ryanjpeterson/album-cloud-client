import React from "react";
import { Button } from "semantic-ui-react";

const MyBtn = ({ genre, color }) => {
  return (
    <Button style={{ marginBottom: "0.5rem" }} color={color}>
      {genre}
    </Button>
  );
};

export default MyBtn;
