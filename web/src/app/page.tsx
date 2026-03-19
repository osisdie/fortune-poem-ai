import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="border-t border-[#4a2c1a]/40">
        <TechStack />
      </div>
    </>
  );
}
