import React from "react";
import ServiceHero from "../_components/hero";
import ServicePrice from "../_components/service-price";
import ServicesCard from "../_components/services-card";

export default function SingleService() {
  return (
    <>
      <ServiceHero />
      <ServicePrice />
      <ServicesCard />
    </>
  );
}
