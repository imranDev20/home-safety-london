import React from "react";
import StayCompliant from "./_components/stay-compliant";
import PageHeader from "@/app/_components/common/page-header";
import BackgroundImage from "@/images/hero-image.jpeg";
import Testimonial from "@/app/(home)/_components/testimonial";
import Partners from "@/app/_components/common/partners";

export default function SingleService() {
  return (
    <>
      <PageHeader backgroundImage={BackgroundImage} title="Services" />
      <StayCompliant />
      <Testimonial />
      <Partners />
    </>
  );
}
