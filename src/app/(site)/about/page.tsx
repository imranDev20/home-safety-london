import React from "react";
import PageHeader from "../../_components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import Advantage from "./_components/advantage";
import Achievement from "./_components/achievement";
import Partners from "../../_components/common/partners";
import AboutCta from "./_components/about-cta";
import AboutUsHome from "../_components/about-us-home";

const About = () => {
  return (
    <>
      <PageHeader backgroundImage={backgroundImage} title="About Us" />
      <AboutUsHome />
      <Advantage />
      <Achievement />
      <AboutCta />
      <Partners />
    </>
  );
};

export default About;
