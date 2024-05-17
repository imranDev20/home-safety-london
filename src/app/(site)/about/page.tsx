import React from "react";
import PageHeader from "../../_components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import AboutUs from "./_components/about";
import Advantage from "./_components/advantage";
import Achivment from "./_components/achivment";
import Partners from "../../_components/common/partners";
import AboutCta from "./_components/about-cta";

const About = () => {
  return (
    <>
      <PageHeader backgroundImage={backgroundImage} title="About Us" />
      <AboutUs />
      <AboutCta />
      <Partners />
      <Advantage />

      <Achivment />
    </>
  );
};

export default About;
