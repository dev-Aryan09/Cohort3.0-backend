import React from "react";
import ShortenForm from "./components/ShortenForm";
import ResultCard from "./components/ResultCard";
import UrlList from "./components/UrlList";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F5F2EB] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6">
        <h1 className="font-mono text-3xl font-bold tracking-[-0.08em] text-[#171717] sm:text-4xl">
          link<span className="text-[#D94A24]">.</span>
        </h1>

        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
          Simple links. Smarter sharing.
        </p>
      </div>
      <div className="">
        {/* Quote */}
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-4xl">
          “Long links.
          <span className="text-[#D94A24]"> Short stories.</span>”
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-500 sm:text-base">
          Turn long, complicated URLs into clean and memorable links that are
          easy to share.
        </p>
      </div>

      {/* URL Form */}
      <main className="mx-auto w-full max-w-4xl">
        {/* Create Short URL */}
        <ShortenForm />

        {/* Newly Created URL */}
        <ResultCard />

        {/* All URLs */}
        <UrlList />
      </main>
    </div>
  );
};

export default App;
