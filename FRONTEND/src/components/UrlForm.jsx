import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newShortUrl = await createShortUrl(url, customSlug);
      setShortUrl(newShortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-xl bg-white shadow-lg border rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-gray-800 mb-2">
              Enter your URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm"
            />
          </div>

          {isAuthenticated && (
            <div>
              <label htmlFor="customSlug" className="block text-sm font-semibold text-gray-800 mb-2">
                Custom URL (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="Enter custom slug"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Shorten URL
          </button>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </form>

        {shortUrl && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Your shortened URL</h2>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 bg-gray-50 sm:text-sm"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-r-md text-sm font-semibold transition-colors ${
                  copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
