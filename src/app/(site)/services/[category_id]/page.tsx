import React from "react";
import PageHeader from "@/app/_components/common/page-header";
import BackgroundImage from "@/images/hero-image.jpeg";
import Partners from "@/app/_components/common/partners";
import Advantage from "../../about/_components/advantage";
import Testimonial from "@/app/(site)/_components/testimonial";
import Services from "./_components/services";

export default function SingleService() {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        title="Electrical Services"
        secondary="Services"
      />

      <Services />
      <Advantage />
      <Testimonial />
      <Partners isHome />
    </>
  );
}
