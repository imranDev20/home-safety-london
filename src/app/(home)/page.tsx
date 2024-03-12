"use client";
import Footer from "@/app/_components/global/footer";
import Header from "@/app/_components/global/header";
import Faq from "@/app/(home)/_components/faq";
import Hero from "@/app/(home)/_components/hero";
import LondonMap from "@/app/(home)/_components/london-map";
import Services from "@/app/(home)/_components/services";
import Sponser from "@/app/(home)/_components/sponser";
import Testimonial from "@/app/(home)/_components/testimonial";
import ContactForm from "./_components/contact-form";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <LondonMap />
      <Sponser />
      <Testimonial />
      <Faq />
      <ContactForm />
      <Footer />
    </main>
  );
}
