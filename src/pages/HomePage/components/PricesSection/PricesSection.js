import React from "react";
import { Link } from "react-router-dom";
import T from "prop-types";

import routes from "../../../../routes";

const PricesSection = ({ location }) => {
  return (
    <section className="prices-section">
      <div className="prices-section__wrapper">
        <div className="prices-section__inner container">
          <header className="prices-section__header">
            <h2 className="prices-section__title">
              <span className="prices-section__title--bold">
                Afforadble Pricing and Packages
              </span>{" "}
              choose your best one
            </h2>
            <p className="prices-section__lead prices__lead">
              Monotonectally grow strategic process improvements vis-a-vis
              integrated resources.
            </p>
          </header>

          <ul className="packages__list">
            <li className="package__item">
              <div>
                <h3 className="package__name package__name--basic">Basic</h3>
                <span className="package__price">$29</span>
              </div>
              <div>
                <ul className="package__desc-list">
                  <li>Push Notifications</li>
                  <li>Data Transfer</li>
                  <li>SQL Database</li>
                  <li>Search & SEO Analytics</li>
                  <li>24/7 Phone Support</li>
                  <li>2 months technical support</li>
                  <li>2+ profitable keyword</li>
                </ul>
                <button className="package__purchase-btn" type="button">
                  Purchase now
                </button>
              </div>
            </li>
            <li className="package__item">
              <div>
                <h3 className="package__name package__name--standard">
                  Standard
                </h3>
                <span className="package__price">$149</span>
              </div>
              <div>
                <ul className="package__desc-list">
                  <li>Push Notifications</li>
                  <li>Data Transfer</li>
                  <li>SQL Database</li>
                  <li>Search & SEO Analytics</li>
                  <li>24/7 Phone Support</li>
                  <li>2 months technical support</li>
                  <li>2+ profitable keyword</li>
                </ul>
                <button className="package__purchase-btn" type="button">
                  Purchase now
                </button>
              </div>
            </li>
            <li className="package__item">
              <div>
                <h3 className="package__name package__name--unlimited">
                  Unlimited
                </h3>
                <span className="package__price">$39</span>
              </div>
              <div>
                <ul className="package__desc-list">
                  <li>Push Notifications</li>
                  <li>Data Transfer</li>
                  <li>SQL Database</li>
                  <li>Search & SEO Analytics</li>
                  <li>24/7 Phone Support</li>
                  <li>2 months technical support</li>
                  <li>2+ profitable keyword</li>
                </ul>
                <button className="package__purchase-btn" type="button">
                  Purchase now
                </button>
              </div>
            </li>
          </ul>

          <p className="prices-section__footer">
            If you need custom services or Need more?{" "}
            <Link
              className="prices-section__contact-link"
              to={{
                state: { from: location },
                pathname: routes.HOME
              }}
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

PricesSection.propTypes = {
  location: T.shape().isRequired
};

export default PricesSection;
