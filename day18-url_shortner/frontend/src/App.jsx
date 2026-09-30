import React from "react";
import ShortenForm from "./components/ShortenForm";
import ResultCard from "./components/ResultCard";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F5F2EB] px-4 py-12">
      <div className="mb-8">
        <h1 className="font-mono text-4xl font-bold tracking-[-0.08em] text-[#171717]">
          link<span className="text-[#D94A24]">.</span>
        </h1>

        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
          Simple links. Smarter sharing.
        </p>
      </div>
      <div className="-mt-13">
        {/* Quote */}
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-4xl">
          “Long links.
          <span className="text-[#D94A24]"> Short stories.</span>”
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-500 sm:text-base">
          Turn long, complicated URLs into clean and memorable links that are
          easy to share.
        </p>
      </div>

      {/* URL Form */}
      <div className="mx-auto w-full max-w-3xl">
        <ShortenForm />

        <ResultCard />
      </div>
    </div>
  );
};

export default App;
