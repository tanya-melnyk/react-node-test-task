import React from "react";

const BenefitsSection = () => {
  return (
    <section className="benefits-section container">
      <header className="benefits-section__header">
        <h2 className="benefits-section__title">
          Why{" "}
          <span className="benefits-section__title--bold">
            small business owners love
          </span>{" "}
          AppCo?
        </h2>
        <p className="benefits-section__lead benefits__lead">
          Our design projects are fresh and simple and will benefit your
          business greatly. Learn more about our work!
        </p>
      </header>

      <ul className="benefits__list">
        <li className="benefit__item">
          <h3 className="benefit__name benefit__name--design">Clean Design</h3>
          <p className="benefit__desc">
            Increase sales by showing true dynamics of your website.
          </p>
        </li>
        <li className="benefit__item">
          <h3 className="benefit__name benefit__name--security">Secure Data</h3>
          <p className="benefit__desc">
            Build your online store’s trust using Social Proof & Urgency.
          </p>
        </li>
        <li className="benefit__item">
          <h3 className="benefit__name benefit__name--retina">Retina Ready</h3>
          <p className="benefit__desc">
            Realize importance of social proof in customer’s purchase decision.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default BenefitsSection;
