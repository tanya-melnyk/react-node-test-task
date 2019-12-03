import React from "react";

import mobileImg from "./images/mobile.png";
import routes from "../../../../routes";

const Header = ({ location }) => {
  return (
    <header className="homePage-header">
      <div className="homePage-header__wrapper container">
        <h1 className="logo">
          <Link className="logo__link" to={routes.HOME}>
            AppCo
          </Link>
        </h1>

        <div className="homePage-header__inner">
          {/* *** INFO BLOCK ***  */}

          <div className="header__info-block">
            <h2 className="header__subject">
              <span className="header__subject header__subject--bold">
                Brainstorming
              </span>{" "}
              for desired perfect Usability
            </h2>
            <p className="header__lead">
              Our design projects are fresh and simple and will benefit your
              business greatly. Learn more about our work!
            </p>

            <div className="header__stats-link-wrapper">
              <Link className="header__stats-link"
                to={{
                  state: { from: location },
                  pathname: routes.USERS
                }}
              >
                View Stats
              </Link>
            </div>
          </div>

          {/* *** Mobile Image *** */}
          <picture className="page-header__image-wrapper">
            <img
              className="page-header__img"
              src={mobileImg}
              alt="smartphone screen"
              width="280"
            />
          </picture>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  location: T.shape().isRequired
};

export default Header;
