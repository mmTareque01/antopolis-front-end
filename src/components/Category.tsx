import React from "react";

interface categoryProps {
  category: string;
  id: string;
  handleAnimal: Function;
}
export default function Category({
  category,
  id,
  handleAnimal,
}: categoryProps) {
  return (
    <div
      onClick={() => {
        handleAnimal(id);
      }}
      className="cursor-pointer capitalize border-custom border-black border rounded-lg mx-2 my-1 px-6 py-3"
    >
      {category}
    </div>
  );
}
