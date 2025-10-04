"use client";

import React, { ChangeEvent, useState } from "react";
import { Card } from "./Card/Card";
import { User } from "@/server-action/server";

const HomePage = ({ data }: { data: User[] }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectInput, setSelectInput] = useState("");

  const filteredUsers = data?.filter((item) => {
    const itemString = Object.values(item).join("").toLowerCase();
    const searchMatch = searchInput
      ? itemString.includes(searchInput.toLowerCase())
      : true;
    const selectMatch = selectInput
      ? itemString.includes(selectInput.toLowerCase())
      : true;
    return searchMatch && selectMatch;
  });

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectInput(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          User Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <input
            type="text"
            className="rounded-lg border border-gray-300 px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search users..."
            value={searchInput}
          />
          <select
            id="lang"
            onChange={handleSelect}
            value={selectInput}
            className="rounded-lg border border-gray-300 px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow"
          >
            <option value="">Filter by type</option>
            <option value="Essence">Essence</option>
            <option value="Eyeshadow">Eyeshadow</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers?.map((el) => (
            <Card
              href={`home/${el?.id}`}
              title={el?.title}
              des={el?.description}
              key={el?.id}
              // Add hover effect to Card if possible
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
