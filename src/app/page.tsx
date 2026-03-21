import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyNotVectorDB from "@/components/WhyNotVectorDB";
import TheStaff from "@/components/TheStaff";
import Proof from "@/components/Proof";
import Integrations from "@/components/Integrations";
import Install from "@/components/Install";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <Hero />
      <WhyNotVectorDB />
      <TheStaff />
      <Proof />
      <Integrations />
      <Install />
      <Contact />
      <Footer />
    </main>
  );
}
