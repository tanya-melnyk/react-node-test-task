import React from "react";
import { Link } from "react-router-dom";

import SubscribeForm from "./SubscribeForm";

import routes from "../../../../routes";

const Footer = () => (
  <footer className="homePage-footer">
    <div className="homePage-footer__wrapper container">
      <SubscribeForm />

      <div className="homePage-footer__infoBlock">
        <h2 className="logo">
          <Link className="logo__link logo__link--footer" to={routes.HOME}>
            AppCo
          </Link>
        </h2>

        <p className="footer__copyright">All rights reserved by ThemeTags</p>

        <p className="footer__copyright">Copyrights © 2019.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
