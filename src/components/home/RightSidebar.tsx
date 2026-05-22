"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, PlayCircle } from "lucide-react";

import { liveNews } from "@/lib/mockData";

export default function RightSidebar() {
  const [location, setLocation] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location.trim()) return;

    setSubmittedLocation(location.trim());
    setLocation("");
  };

  return (
    <aside className="w-1/3 space-y-8">
      {/* Live Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600"></span>
          <h2 className="text-lg font-bold text-gray-900">Live</h2>
        </div>

        {liveNews ? (
          <article className="overflow-hidden bg-white shadow-sm">
            <div className="relative h-48 w-full">
              <Image
                src={liveNews.image}
                alt={liveNews.title}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-red-600 transition hover:scale-105 hover:bg-white"
                  aria-label="Play live news"
                >
                  <PlayCircle size={28} />
                </button>
              </div>

              <span className="absolute left-3 top-3 bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Live
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-base font-bold leading-snug text-gray-900">
                {liveNews.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {liveNews.description}
              </p>
            </div>
          </article>
        ) : (
          <p className="text-sm text-gray-500">No live news available.</p>
        )}
      </section>

      {/* Location News Section */}
      <section className="bg-gray-100 p-5">
        <div className="mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-red-600" />
          <h2 className="text-lg font-bold text-gray-900">Location News</h2>
        </div>

        <p className="mb-4 text-sm leading-6 text-gray-600">
          Get the latest news and updates from your area.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-600"
          />

          <button
            type="submit"
            className="w-full bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
          >
            Submit
          </button>
        </form>

        {submittedLocation && (
          <p className="mt-4 text-sm text-gray-600">
            Showing news for{" "}
            <span className="font-semibold text-gray-900">
              {submittedLocation}
            </span>
            .
          </p>
        )}
      </section>
    </aside>
  );
}