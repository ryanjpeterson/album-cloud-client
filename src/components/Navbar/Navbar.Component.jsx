import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = ({ authenticated }) => {
  const authenticatedContent = (
    <Menu.Item as={Link} to="/post" position="right">
      Post
    </Menu.Item>
  );

  const unauthenticatedContent = (
    <Menu.Item as={Link} to="/login" position="right">
      Login
    </Menu.Item>
  );

  return (
    <Menu fixed="top">
      <Menu.Item header as={Link} to="/">
        album cloud
      </Menu.Item>
      {authenticated ? authenticatedContent : unauthenticatedContent}
    </Menu>
  );
};

export default Navbar;
