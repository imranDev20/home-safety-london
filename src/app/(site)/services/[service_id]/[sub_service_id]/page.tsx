"use client";
import React from "react";
import ServiceHero from "../_components/hero";
import ServicePrice from "../_components/service-price";
import ServicesCard from "../_components/services-card";
import StayCompliant from "../_components/stay-compliant";
import TrustedPartner from "../_components/trusted-partner";
import ServiceAbout from "../_components/about";
import ServiceTestimonial from "../_components/testimonial";

export default function SingleSubService() {
  return (
    <>
      <ServiceHero />
      <ServicePrice />
      <ServiceAbout />
      <TrustedPartner />
      <StayCompliant />
      <ServiceTestimonial />
    </>
  );
}
