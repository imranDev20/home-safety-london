"use client";
import Header from "@/components/header/header";
import Faq from "@/components/home/faq";
import Hero from "@/components/home/hero";
import LondonMap from "@/components/home/london-map";
import Services from "@/components/home/services";
import Sponser from "@/components/home/sponser";
import Testimonial from "@/components/home/testimonial";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <LondonMap />
      <Sponser />
      <Testimonial />
      <Faq />
    </main>
  );
}
