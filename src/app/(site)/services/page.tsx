import React from "react";
import PageHeader from "../../_components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import ServicesItem from "./_components/services";
import ServiceCategories from "../_components/service-categories";

export default function Services() {
  return (
    <>
      <PageHeader backgroundImage={backgroundImage} title="Services" />
      <ServiceCategories />
      <ServicesItem />
    </>
  );
}
