"use client";
import Faq from "@/app/(site)/_components/faq";
import Hero from "@/app/(site)/_components/hero";
import LondonMap from "@/app/(site)/_components/london-map";
import Services from "@/app/(site)/_components/services";
import Testimonial from "@/app/(site)/_components/testimonial";
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
