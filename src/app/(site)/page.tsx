import Faq from "@/app/(site)/_components/faq";
import Hero from "@/app/(site)/_components/hero";
import ServiceCategories from "@/app/(site)/_components/service-categories";
import AboutUsHome from "./_components/about-us-home";
import Partners from "../_components/common/partners";
import Testimonial from "./_components/testimonial";
import Contact from "./_components/contact";
import CallToAction from "./_components/call-to-action";
import Services from "./_components/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceCategories />
      <AboutUsHome />
      <Services />
      <Testimonial />
      <Partners isHome />
      <CallToAction />
      <Faq />
      <Contact />
    </main>
  );
}
