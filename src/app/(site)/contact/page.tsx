import React from "react";
import ContactMap from "./_components/contact-map";
import ContactAddress from "./_components/contact-address";
import PageHeader from "../../_components/common/page-header";
import BackgroundImage from "@/images/about-bg.jpeg";
import ContactUsForm from "../../_components/common/contact-us-form";
import ContactUs from "./_components/contact-us";

export default function Contact() {
  return (
    <>
      <PageHeader backgroundImage={BackgroundImage} title="Contact Us" />
      <ContactAddress />
      <ContactUs />
      <ContactMap />
    </>
  );
}
