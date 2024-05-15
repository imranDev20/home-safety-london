import React from "react";
import PageHeader from "@/app/_components/common/page-header";
import BackgroundImage from "@/images/hero-image.jpeg";
import Partners from "@/app/_components/common/partners";
import Advantage from "../../about/_components/advantage";
import Testimonial from "@/app/_components/common/testimonial";

export default function SingleService() {
  return (
    <>
      <PageHeader backgroundImage={BackgroundImage} title="Services" />
      <Advantage />
      <Testimonial />
      <Partners />
    </>
  );
}
