"use client";
import Faq from "@/app/(home)/_components/faq";
import Hero from "@/app/(home)/_components/hero";
import LondonMap from "@/app/(home)/_components/london-map";
import Services from "@/app/(home)/_components/services";
import Testimonial from "@/app/(home)/_components/testimonial";
import ContactForm from "./_components/contact-form";
import About from "./_components/about";
import SubServices from "./_components/sub-services";
import Partners from "../_components/common/partners";
import ContactUsForm from "../_components/common/contact-us-form";

export default function Home() {
  return (
    <main>
      <Hero />
      <SubServices />
      <About />
      <Services />
      <LondonMap />
      <Testimonial />
      <Partners />
      <Faq />
      <ContactUsForm />
    </main>
  );
}
