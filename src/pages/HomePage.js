import React, { Component } from "react";
import { Link } from "react-router-dom";
// import T from "prop-types";

import routes from "../routes";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h2>
          <span>Brainstorming</span> for desired perfect Usability
        </h2>

        <div>
          <Link to={routes.USERS}>View Stats</Link>
        </div>
      </div>
    );
  }
}
