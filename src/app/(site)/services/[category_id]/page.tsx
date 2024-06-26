import React from "react";
import PageHeader from "@/app/_components/common/page-header";
import BackgroundImage from "@/images/hero-image.jpeg";
import Partners from "@/app/_components/common/partners";
import Advantage from "../../about/_components/advantage";
import Testimonials from "@/app/(site)/_components/testimonials";
import Services from "./_components/services";
import CallToAction from "../../_components/call-to-action";

export default function SingleService() {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        title="Electrical Services"
        secondary="Services"
      />

      <Services />
      <CallToAction />
      <Advantage />
      <Testimonials />
      <Partners isHome />
    </>
  );
}
