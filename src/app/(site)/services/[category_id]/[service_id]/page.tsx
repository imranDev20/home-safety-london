import React from "react";
import ServicePrice from "./_components/service-price";
import ServiceAbout from "../_components/about";
import Partners from "@/app/_components/common/partners";
import Advantage from "@/app/(site)/about/_components/advantage";
import Testimonials from "@/app/(site)/_components/testimonials";
import PageHeader from "@/app/_components/common/page-header";
import BackgroundImage from "@/images/hero-image.jpeg";

export default function SingleSubService() {
  return (
    <>
      {/* <ServiceHero /> */}
      <PageHeader
        backgroundImage={BackgroundImage}
        title="EICR"
        secondary="Services"
        tertiary="Electrical Services"
      />
      <ServicePrice />
      <ServiceAbout />
      <Advantage />
      <Partners />
      <Testimonials />
    </>
  );
}
