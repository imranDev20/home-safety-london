"use client";
import React from "react";
import ServiceHero from "../_components/hero";
import ServicePrice from "../_components/service-price";
import ServiceAbout from "../_components/about";
import Partners from "@/app/_components/common/partners";
import Advantage from "@/app/(site)/about/_components/advantage";
import Testimonial from "@/app/_components/common/testimonial";

export default function SingleSubService() {
  return (
    <>
      <ServiceHero />
      <ServicePrice />
      <ServiceAbout />
      <Advantage />
      <Partners />
      <Testimonial />
    </>
  );
}
