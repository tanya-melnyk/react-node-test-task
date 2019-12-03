import React from "react";
// import { Link } from "react-router-dom";
import T from "prop-types";

import Header from "./components/Header";

// import routes from "../routes";

const HomePage = ({ location }) => (
  // {/* <>
  //  <Header location={location}/>
  //  <main>
  //    <SectionOne />
  //    <SectionTwo />
  //    <SectionThree />
  //  </main>
  //  <Footer/>
  //  </> */}
  <Header location={location}/>
  
);

HomePage.propTypes = {
  location: T.shape().isRequired
};

export default HomePage;
