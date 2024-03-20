"use client";
import Faq from "@/app/(home)/_components/faq";
import Hero from "@/app/(home)/_components/hero";
import LondonMap from "@/app/(home)/_components/london-map";
import Services from "@/app/(home)/_components/services";
import Sponser from "@/app/(home)/_components/sponser";
import Testimonial from "@/app/(home)/_components/testimonial";
import ContactForm from "./_components/contact-form";
import About from "./_components/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />

      <LondonMap />
      <Testimonial />
      <Sponser />
      <Faq />
      <ContactForm />
    </main>
  );
}
