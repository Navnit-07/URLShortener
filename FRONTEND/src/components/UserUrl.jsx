import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0
  });
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto my-6 bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 text-center text-sm font-medium">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls?.urls?.length) {
    return (
      <div className="max-w-xl mx-auto my-6 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-lg font-semibold">No URLs found</p>
        <p className="mt-1 text-sm">You haven't created any shortened URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6 border border-gray-100">
      <div className="overflow-x-auto max-h-72">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Original URL</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Short URL</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Clicks</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...urls.urls].reverse().map((url) => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 max-w-xs truncate text-gray-800">{url.full_url}</td>
                <td className="px-6 py-4 text-blue-600 hover:text-blue-800 hover:underline">
                  <a
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`localhost:3000/${url.short_url}`}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium shadow-sm transition ${
                      copiedId === url._id
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5
                            a2 2 0 002 2h2a2 2 0 002-2M8 5
                            a2 2 0 012-2h2a2 2 0 012 2m0 0
                            h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3
                            3l3 3"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;
