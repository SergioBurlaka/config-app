import React from "react";
import { NavLink } from "react-router-dom";

import { routes } from "../../routes";

import "./Header.scss";

const Header = () => {
  const showDesktopMenu = ({ path, name, exact }, i) => {
    return (
      <NavLink
        key={i}
        to={path}
        exact={exact}
        activeClassName="active"
        className='custom-link'
      >
        <div className="p-3">{name}</div>
      </NavLink>
    );
  };

  return (
    <div id="header">
      <div className="munu-section-container">
        <div className="menu-wrapper d-flex align-items-center">
       {routes.map(showDesktopMenu)}</div>
      </div>
    </div>
  );
};

export default Header;
