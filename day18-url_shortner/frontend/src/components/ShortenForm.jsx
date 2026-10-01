import { Link2, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { createUrl } from "../api/urls";
import useUrlContext from "../context/UrlContext";

const ShortenForm = () => {
  const context = useUrlContext();
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // create URL
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!inputUrl.trim()) return;

      const response = await createUrl({ url: inputUrl });
      console.log("Response", response);

      if (response) {
        context.setAllUrls((prev) => [...prev, response.data]);
      }

      if (!response.data.shortCode) {
        return alert("Short code missing or Something went wrong");
      }

      context.setCurrentUrl(`http://localhost:3000/${response.data.shortCode}`);
    } catch (error) {
      console.log("Error in submitting form,", error?.message);
    } finally {
      setInputUrl("");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl px-3 p-4 sm:px-4">
      <div
        className="
       flex w-full items-center gap-1.5
       rounded-xl border border-gray-300
       bg-white p-1.5
       shadow-sm
       transition-all duration-200
       focus-within:border-gray-500
       focus-within:ring-2
       focus-within:ring-gray-200
       sm:gap-2
      "
      >
        {/* URL Icon */}
        <div className="pl-3 text-gray-400 sm:block">
          <Link2 size={19} strokeWidth={1.8} />
        </div>

        {/* Input */}
        <input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste a long URL here..."
          required
          disabled={loading}
          className="
            min-w-0 flex-1
            bg-transparent
            px-2 py-2.5
            font-mono text-sm
            text-gray-900
            outline-none
            placeholder:text-gray-400
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:py-3
          "
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading || !inputUrl.trim()}
          className="
           flex shrink-0 items-center justify-center gap-2
           rounded-lg
           bg-gray-950
           px-3 py-2.5
           text-sm font-semibold text-white
           transition-all duration-200
           hover:bg-gray-800
           active:scale-[0.98]
           disabled:cursor-not-allowed
           disabled:opacity-50
           sm:px-5 sm:py-3
        "
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              <span>Shortening...</span>
            </>
          ) : (
            <>
              <span title="paste a valid url">Shorten</span>
              <ArrowRight size={17} className="hidden sm:block" />
            </>
          )}
        </button>
      </div>

      {inputUrl !== "" && (
        <p
          className={`mt-1 text-xs ${inputUrl.startsWith("http://") || inputUrl.startsWith("https://") ? "text-green-600" : "text-red-600"}`}
        >
          Enter a valid URL starting with http:// or https://
        </p>
      )}
    </form>
  );
};

export default ShortenForm;
