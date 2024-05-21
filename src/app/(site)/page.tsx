"use client";
import Faq from "@/app/(site)/_components/faq";
import Hero from "@/app/(site)/_components/hero";
import LondonMap from "@/app/(site)/_components/london-map";
import Services from "@/app/(site)/_components/services";
import About from "./_components/about";
import SubServices from "./_components/sub-services";
import Partners from "../_components/common/partners";
import Testimonial from "./_components/testimonial";
import Contact from "./_components/contact";
import Cta from "./_components/cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <SubServices />
      {/* <LondonMap /> */}
      <Testimonial />
      <Partners isHome />
      <Cta />
      <Faq />
      <Contact />
    </main>
  );
}
