import React from "react";
import { Link } from "react-router-dom";

import routes from "../../routes";

const SimpleHeader = () => {
  return (
    <header className="simple-header">
      <div className="container">
        <h1 className="logo">
          <Link
            className="logo__link logo__link--simple-header"
            to={routes.HOME}
          >
            AppCo
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default SimpleHeader;
