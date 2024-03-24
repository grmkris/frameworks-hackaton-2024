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
    if (inputLength >= 5) return;
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

      {inputLength < 5 && (
        <Button onClick={handleAddInput} className="w-[250px] p-2 rounded-sm">
          <MdAdd />
          Add Link
        </Button>
      )}
    </>
  );
};
