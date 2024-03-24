"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAdd, MdDelete } from "react-icons/md";

export const LinkInput = () => {
  const [inputLength, setInputLength] = useState(1);
  const [linksData, setLinksData] = useState([]);
  const MAX_NUMBER_OF_LINKS = 4;

  const handleAddInput = () => {
    if (inputLength >= MAX_NUMBER_OF_LINKS) return;
    setInputLength(inputLength + 1);
  };

  const handleRemoveInput = (index: number) => {
    setInputLength(inputLength - 1);
    const newLinksData = linksData.filter((_, i) => i !== index);
    setLinksData(newLinksData);
  };

  return (
    <>
      {Array.from({ length: inputLength }).map((_, i) => (
        <div key={i} className="flex flex-row gap-2 items-center">
          <GiHamburgerMenu color="#000000" className="cursor-pointer" />
          <Input
            type="text"
            placeholder="Title"
            className="w-[2MAX_NUMBER_OF_LINKS0px] p-2 rounded-sm"
          />
          <Input
            type="text"
            placeholder="URL"
            className="w-[2MAX_NUMBER_OF_LINKS0px] p-2 rounded-sm"
          />
          <MdDelete
            onClick={() => {
              handleRemoveInput(i);
            }}
            className="cursor-pointer"
          />
        </div>
      ))}

      {inputLength < MAX_NUMBER_OF_LINKS && (
        <Button
          onClick={handleAddInput}
          className="flex flex-row gap-1 items-center justify-center w-[2MAX_NUMBER_OF_LINKS0px] p-2 rounded-sm bg-gray-800 px-8"
        >
          <MdAdd color="#ffffff" />
          <p className="text-white">Add Link</p>
        </Button>
      )}
    </>
  );
};
