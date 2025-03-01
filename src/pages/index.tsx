import HomeFooter from "@/components/homefooter";
import HomeHero from "@/components/homehero";
import HomeJoinUs from "@/components/homejoinus";
import HomeService from "@/components/homeservice";
import { Navbar } from "@/components/navbar";
import { ServicesProvider } from "@/components/ServicesContext";

export default function Home() {
  return (
    <>
      <ServicesProvider>
        <Navbar />
        <HomeHero />
        <HomeService />
        <HomeJoinUs />
        <HomeFooter />
      </ServicesProvider>
    </>
  );
}
