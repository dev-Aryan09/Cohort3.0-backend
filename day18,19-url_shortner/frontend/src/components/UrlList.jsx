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
              grid grid-cols-[auto_1fr_auto]
              gap-x-3 gap-y-2
              px-3 py-3
              transition-colors
             hover:bg-stone-50
              sm:flex sm:items-center sm:gap-3
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
                  sm:w-24
                  sm:shrink-0
                  text-orange-600
                  hover:underline
                "
              >
                {item.shortCode}
              </a>

              {/* Original URL */}
              <div className="col-span-1 min-w-0 sm:flex-1">
                <p
                  title={item.originalUrl}
                  className={`
  truncate text-sm
  transition-all
  text-stone-500
`}
                >
                  {item.originalUrl}
                </p>
              </div>

              {/* Clicks */}
              <div className="col-start-2 row-start-3 sm:col-auto sm:row-auto">
                <span className="font-mono text-sm text-stone-800">
                  {item.clicks || 0} clicks
                </span>
              </div>

              {/* Actions */}
              <div
                className="
  col-start-2 row-start-3
  flex items-center gap-1
  justify-self-end
  sm:col-auto sm:row-auto sm:ml-auto
"
              >
                <button
                  type="button"
                  onClick={() => handleCopy(shortUrl, item._id)}
                  className="
                    flex items-center gap-1.5
                    rounded-md
                    border border-stone-300
                    px-2.5 py-1.5
                    text-[11px]
                    text-stone-600
                    transition
                    hover:bg-stone-100
                    active:scale-95
                    cursor-pointer
                     sm:px-2.5 sm:text-xs
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
