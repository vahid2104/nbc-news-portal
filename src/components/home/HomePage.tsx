import HeroSection from "@/components/home/hero";
import BreakingNews from "./BreakingNews";
import LatestStories from "@/components/home/latestStories";
import RightSidebar from "@/components/home/rightSideBar";
import EditorsPicks from "@/components/home/editorsPicks";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <HeroSection />
        <BreakingNews />

        <section className="flex flex-col md:flex-row gap-8">
          <LatestStories />
          <RightSidebar />
        </section>

        <EditorsPicks />
      </main>

    </div>
  );
}