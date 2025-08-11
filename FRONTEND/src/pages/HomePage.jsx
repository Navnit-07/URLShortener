import React from "react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Shorten Your URL
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Paste a long link and get a short, shareable URL instantly.
        </p>
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
