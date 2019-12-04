import React from "react";
import T from "prop-types";

import Header from "./components/Header";
import BenefitsSection from "./components/BenefitsSection";
import LearnMoreSection from "./components/LearnMoreSection";
import PricesSection from "./components/PricesSection";
import Footer from "./components/Footer";

const HomePage = ({ location }) => (
  <>
    <Header location={location} />
    <main>
      <BenefitsSection />
      <LearnMoreSection location={location} />
      <PricesSection location={location} />
    </main>
    <Footer />
  </>
);

HomePage.propTypes = {
  location: T.shape().isRequired
};

export default HomePage;
