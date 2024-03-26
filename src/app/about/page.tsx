import React from "react";
import PageHeader from "../_components/common/page-header";
import backgroundImage from "../../images/about-bg.jpeg";
import AboutUs from "./_components/about";
import ExpertTeam from "./_components/expert-team";
import Advantage from "./_components/advantage";
import TrustedPartner from "../services/[service_id]/_components/trusted-partner";
import Achivment from "./_components/achivment";

const About = () => {
  return (
    <>
      <PageHeader backgroundImage={backgroundImage} title="About Us" />
      <AboutUs />
      {/* <ExpertTeam /> */}
      <Advantage />
      <Achivment />
      <TrustedPartner />
    </>
  );
};

export default About;
