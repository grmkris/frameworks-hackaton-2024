"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { IoUnlink } from "react-icons/io5";
import QRCode from "react-qr-code";

import { UserType } from "../[nickname]/page";

export const UserProfile = ({
  user,
  isEditing,
  onEdit,
  form,
}: {
  user?: UserType;
  isEditing?: boolean;
  onEdit?: () => void;
  form?: any;
}) => {
  const [name, setName] = useState(user?.nickname);

  return (
    <div className="mt-16 w-full flex flex-col justify-center items-center gap-6">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src={user?.image ?? "/racccoon.jpeg"}
          className="w-32 rounded-full"
          alt="Avatar"
          width={128}
          height={128}
        />
        {!isEditing && (
          <>
            <IoUnlink size={24} />
            <QRCode value={user?.wallet ?? "random value"} size={100} />
          </>
        )}
      </div>
      {isEditing && (
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-md text-gray-500">Wallet:</p>
          <p className="text-xs text-gray-500">{user?.wallet}</p>
        </div>
      )}
      {!isEditing && (
        <p className="font-bold text-zuriGray-900 text-xl ">
          @{user?.nickname}
        </p>
      )}
      {isEditing && (
        <div className="flex flex-row gap-1 items-center justify-center mb-4">
          <p className="text-xl">@</p>
          <Input
            value={name}
            defaultValue={"YourNickname"}
            className="max-w-40 p-2 border-b border-transparent border-b-gray-500 rounded-none text-xl text-black"
            onChange={(e) => {
              setName(e.target.value);
              form.setValue("name", e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};
