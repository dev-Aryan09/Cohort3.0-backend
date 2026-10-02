import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import useUrlContext from "../context/UrlContext";

const ResultCard = () => {
  const context = useUrlContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(context.currentUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  if (!context.currentUrl) return null;

  return (
    <div
      className="
         w-4xl
        rounded-xl
        border border-stone-300
        bg-white
        px-4 py-1.5
        shadow-sm
      "
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Short URL */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium text-stone-400">
            Your shortened URL
          </p>

          <a
            href={context.currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block truncate
              font-mono text-sm
              text-orange-600
              hover:underline
            "
          >
            {context.currentUrl}
          </a>
        </div>

        {/* Copy */}
        <button
          type="button"
          onClick={handleCopy}
          className="
            flex shrink-0 items-center gap-1.5
            rounded-lg
            border border-stone-300
            bg-stone-50
            px-3 py-2
            text-xs font-medium
            text-stone-600
            transition
            hover:bg-stone-100
            active:scale-95
            cursor-pointer
            sm:px-3
          "
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>

        {/* Open URL */}
        <a
          href={context.currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden shrink-0
            rounded-lg
            border border-stone-300
            p-2
            text-stone-500
            transition
            hover:bg-stone-100
            sm:block
            cursor-pointer
          "
          aria-label="Open shortened URL"
        >
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
};

export default ResultCard;
