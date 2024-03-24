"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAdd, MdDelete } from "react-icons/md";

import { LinkForm, UserForm } from "./page";

export const LinkInput = ({ form }: { form: any }) => {
  const [inputLength, setInputLength] = useState(0);
  const [linksData, setLinksData] = useState<LinkForm[]>([]);
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
      {Array.from({ length: inputLength + 1 }).map((_, i) => (
        <div key={i} className="flex flex-row gap-2 items-center">
          <GiHamburgerMenu color="#000000" className="cursor-pointer" />
          <Input
            value={linksData[i]?.title ?? ""}
            type="text"
            placeholder="Title"
            className="w-[2MAX_NUMBER_OF_LINKS0px] p-2 rounded-sm"
            onChange={(e) => {
              const modifiedLink: LinkForm = {
                title: e.target.value,
                url: linksData[i]?.url ?? "",
              };
              setLinksData([
                ...linksData.slice(0, i),
                modifiedLink,
                ...linksData.slice(i + 1),
              ]);
              form.setValue(`links`, [
                ...linksData.slice(0, i),
                modifiedLink,
                ...linksData.slice(i + 1),
              ]);
            }}
          />
          <Input
            value={linksData[i]?.url ?? ""}
            type="text"
            placeholder="URL"
            className="w-[2MAX_NUMBER_OF_LINKS0px] p-2 rounded-sm"
            onChange={(e) => {
              const modifiedLink: LinkForm = {
                title: linksData[i]?.title ?? "",
                url: e.target.value,
              };
              setLinksData([
                ...linksData.slice(0, i),
                modifiedLink,
                ...linksData.slice(i + 1),
              ]);
              form.setValue(`links`, [
                ...linksData.slice(0, i),
                modifiedLink,
                ...linksData.slice(i + 1),
              ]);
            }}
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
          onClick={(e) => {
            e.preventDefault();
            handleAddInput();
          }}
          className="flex flex-row gap-1 items-center justify-center w-[2MAX_NUMBER_OF_LINKS0px] p-2 rounded-sm bg-gray-800 px-8"
        >
          <MdAdd color="#ffffff" />
          <p className="text-white">Add Link</p>
        </Button>
      )}
    </>
  );
};
