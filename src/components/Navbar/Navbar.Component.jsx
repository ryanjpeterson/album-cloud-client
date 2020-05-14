import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu fixed="top">
      <Menu.Item header as={Link} to="/">
        album cloud
      </Menu.Item>
      <Menu.Item as={Link} to="/genres">
        Genres
      </Menu.Item>
      <Menu.Item as={Link} to="/post" position="right">
        Post
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
