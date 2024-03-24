"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAdd, MdDelete } from "react-icons/md";

export const LinkInput = () => {
  const [inputLength, setInputLength] = useState(1);
  const [linksData, setLinksData] = useState([]);

  const handleAddInput = () => {
    setInputLength(inputLength + 1);
  };

  const handleRemoveInput = (index: number) => {
    setInputLength(inputLength - 1);
    const newLinksData = linksData.filter((_, i) => i !== index);
  };

  return (
    <>
      {Array.from({ length: inputLength }).map((_, i) => (
        <div key={i} className="flex flex-row gap-2 items-center">
          <GiHamburgerMenu color="#000000" className="cursor-pointer" />
          <Input
            type="text"
            placeholder="Title"
            className="w-[250px] p-2 rounded-sm"
          />
          <Input
            type="text"
            placeholder="URL"
            className="w-[250px] p-2 rounded-sm"
          />
          <MdDelete
            onClick={() => {
              handleRemoveInput(i);
            }}
          />
        </div>
      ))}

      <Button
        onClick={handleAddInput}
        className="flex flex-row gap-1 bg-gray-700 p-2 rounded-md px-8"
      >
        <MdAdd color="#ffffff" />
        <p className="text-white">Add Link</p>
      </Button>
    </>
  );
};
