import React from "react";

interface categoryProps {
  category: string;
  id: string;
  handleAnimal: Function;
  active: boolean
}
export default function Category({
  category,
  id,
  handleAnimal,
  active = false
}: categoryProps) {
  return (
    <div
      onClick={() => {
        handleAnimal(id);
      }}
      className={`${active?"border-green-500":"border-red-500"} cursor-pointer capitalize border-custom border-black border rounded-lg mx-2 my-1 px-6 py-3`}
    >
      {category}
    </div>
  );
}
