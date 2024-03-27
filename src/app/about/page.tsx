import React from "react";
import PageHeader from "../_components/common/page-header";
import backgroundImage from "../../images/about-bg.jpeg";
import AboutUs from "./_components/about";
import Advantage from "./_components/advantage";
import Achivment from "./_components/achivment";
import Partners from "../_components/common/partners";

const About = () => {
  return (
    <>
      <PageHeader backgroundImage={backgroundImage} title="About Us" />
      <AboutUs />
      {/* <ExpertTeam /> */}
      <Advantage />
      <Partners />
      <Achivment />
    </>
  );
};

export default About;
