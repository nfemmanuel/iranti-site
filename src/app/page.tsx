import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyNotVectorDB from "@/components/WhyNotVectorDB";
import TheStaff from "@/components/TheStaff";
import Proof from "@/components/Proof";
import Integrations from "@/components/Integrations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Proof />
      <WhyNotVectorDB />
      <Integrations />
      <TheStaff />
      <Contact />
      <Footer />
    </main>
  );
}
