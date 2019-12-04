import React from "react";
import { Link } from "react-router-dom";

import routes from "../../routes";

const SimpleFooter = () => {
  return (
    <footer className="simple-footer ">
      <div className="simple-footer__wrapper container">
        <h1 className="logo logo--simple-footer">
          <Link
            className="logo__link logo__link--simple-footer"
            to={routes.HOME}
          >
            AppCo
          </Link>
        </h1>

        <p className="footer__copyright">All rights reserved by ThemeTags</p>

        <p className="footer__copyright">Copyrights © 2019.</p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
