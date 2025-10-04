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
    <div>
      <input
        type="text"
        className="rounded-lg w-full mb-5"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="search"
      />
      <select id="lang" onChange={handleSelect} value={selectInput}>
        <option value="">Select</option>
        <option value="Essence">Essence</option>
        <option value="Eyeshadow">Eyeshadow</option>
      </select>
      <div className="grid grid-cols-4 gap-3">
        {filteredUsers?.map((el) => (
          <Card
            href={`home/${el?.id}`}
            title={el?.title}
            des={el?.description}
            key={el?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
