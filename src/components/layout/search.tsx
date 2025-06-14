"use client";

import {  SearchIcon } from "lucide-react";
import { useState } from "react";

interface SearchProps {
  isMobile?: boolean;
}

export default function Search({ isMobile = false }: SearchProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isMobile) {
    return (
      <div>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="flex items-center text-gray-700 hover:text-amber-600"
        >
          <SearchIcon className="w-5 h-5 mr-3" />
          Search
        </button>
        {isSearchOpen && (
          <div className="pt-4">
            <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jewelry..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
      {isSearchOpen && (
        <div className="border-t border-gray-100 py-4">
          <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jewelry..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}