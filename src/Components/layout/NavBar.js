import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "./images/logo.png"

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top pl-5">
          <Link to={`/`}>
            <a className="navbar-brand" ><img src={logo} style={{ width: "5em"}}></img></a>
          </Link>
        </nav>
      </div>
    );
  }
}
