import React from "react";
import { Link } from "react-router-dom";
import T from "prop-types";

import routes from "../routes";

const HomePage = ({ location }) => (
  <div>
    <h2>
      <span>Brainstorming</span> for desired perfect Usability
    </h2>

    <div>
      <Link
        to={{
          state: { from: location },
          pathname: routes.USERS
        }}
      >
        View Stats
      </Link>
    </div>
  </div>
);

HomePage.propTypes = {
  location: T.shape().isRequired
};

export default HomePage;
