import React from "react";
import ContactHeader from "./_components/contact-header";
import ContactMap from "./_components/contact-map";
import ContactUs from "./_components/contact-us";
import ContactAddress from "./_components/contact-address";

export default function Contact() {
  return (
    <>
      <ContactHeader />
      <ContactMap />
      <ContactAddress />
      <ContactUs />
    </>
  );
}
