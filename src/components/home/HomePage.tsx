import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "./hero/HeroSection";
import BreakingNews from "./BreakingNews";
import LatestStories from "./LatestStories";
import RightSidebar from "./RightSidebar";
import EditorsPicks from "./EditorsPicks";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <BreakingNews />

        <section>
          <LatestStories />
          <RightSidebar />
        </section>

        <EditorsPicks />
      </main>

      <Footer />
    </div>
  );
}