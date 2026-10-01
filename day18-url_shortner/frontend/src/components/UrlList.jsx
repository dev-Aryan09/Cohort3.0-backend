import { Copy, Trash2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import useUrlContext from "../context/UrlContext";
import { deleteUrl, fetchAllUrls } from "../api/urls";

const UrlList = () => {
  const { urls, setAllUrls } = useUrlContext();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id); // performs an API call
      /**
      // Option 1: Refetch everything
      const updatedUrls = await fetchAllUrls();
      setAllUrls(updatedUrls);
       */

      // Option 2 (better): Update state locally without refetch
      setAllUrls((prev) => prev.filter((url) => url._id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  useEffect(() => {
    const handleFetchAllUrls = async () => {
      try {
        const response = await fetchAllUrls();
        console.log("res", response.data.allUrls);
        setAllUrls(response.data.allUrls);
      } catch (error) {
        console.log(
          "Error in fetching URLs,",
          error?.message || "Failed to fetch URLs",
        );
      }
    };

    handleFetchAllUrls();
  }, []);

  if (!urls.length) {
    return (
      <div className="mt-8 border border-dashed border-stone-300 py-10 text-center">
        <p className="text-md font-semibold text-stone-500">
          You haven't created any short URLs yet.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-stone-900">
          Your links ({urls.length})
        </h2>
      </div>

      {/* List */}
      <div className="overflow-hidden border border-stone-300">
        {urls.map((item, index) => {
          const shortUrl = `http://localhost:3000/${item.shortCode}`;

          return (
            <div
              key={item._id || item.shortCode}
              className={`
                flex items-center gap-4
                px-3 py-3
                transition-colors
                hover:bg-stone-50
                ${index !== urls.length - 1 ? "border-b border-stone-200" : ""}
              `}
            >
              {/* Short Code */}
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-24 shrink-0
                  truncate
                  font-mono text-sm
                  text-orange-600
                  hover:underline
                "
              >
                {item.shortCode}
              </a>

              {/* Original URL */}
              <div className="min-w-0 flex-1">
                <p
                  title={item.originalUrl}
                  className="
                    truncate
                    text-sm
                    text-stone-500
                  "
                >
                  {item.originalUrl}
                </p>
              </div>

              {/* Clicks */}
              <div className="hidden shrink-0 sm:block">
                <span className="font-mono text-sm text-stone-800">
                  {item.clicks || 0} clicks
                </span>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(shortUrl, item._id)}
                  className="
                    flex items-center gap-1.5
                    rounded-md
                    border border-stone-300
                    px-2.5 py-1.5
                    text-xs
                    text-stone-600
                    transition
                    hover:bg-stone-100
                    active:scale-95
                    cursor-pointer
                  "
                >
                  {copiedId === item._id ? (
                    <span className="flex gap-2 text-green-400">
                      <Check size={16} />
                      Copied
                    </span>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="
                    rounded-md
                    border border-stone-300
                    p-1.5
                    text-stone-500
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-500
                    active:scale-95
                    cursor-pointer
                  "
                  aria-label="Delete URL"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UrlList;
