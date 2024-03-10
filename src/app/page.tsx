"use client";
import Header from "@/components/header/header";
import Hero from "@/components/home/hero";
import LondonMap from "@/components/home/london-map";
import Services from "@/components/home/services";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <LondonMap />
    </main>
  );
}
