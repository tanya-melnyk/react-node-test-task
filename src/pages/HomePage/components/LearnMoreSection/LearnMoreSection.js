import React from "react";
import { Link } from "react-router-dom";

import macbookImg from "./images/macbook.png";
import routes from "../../../../routes";

const LearnMoreSection = ({ location }) => {
  return (
    <section className="learn-more-section">
      <div className="learn-more-section__wrapper container">
        {/* *** INFO BLOCK ***  */}

        <div className="learn-more-section__info-block">
          <h2 className="learn-more-section__subject">
            Start Managing your apps business, more faster
          </h2>
          <p className="learn-more-section__lead">
            Objectively deliver professional value with diverse web-readiness.
            Collaboratively transition wireless customer service without
            goal-oriented catalysts for change. Collaboratively.
          </p>

          <div className="learn-more-section__link-wrapper">
            <Link
              className="learn-more-section__link"
              to={{
                state: { from: location },
                pathname: routes.HOME
              }}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* *** MacBook Image *** */}
        <picture className="learn-more-section__img-wrapper">
          <img
            className="learn-more-section__img"
            src={macbookImg}
            alt="macbook"
            width="280"
          />
        </picture>
      </div>
    </section>
  );
};

export default LearnMoreSection;
