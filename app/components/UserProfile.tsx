"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";

import { UserType } from "../[nickname]/page";

export const UserProfile = ({
  user,
  isEditing,
}: {
  user?: UserType;
  isEditing?: boolean;
}) => {
  return (
    <div className="mt-16 w-full flex flex-col justify-center items-center gap-6">
      <Image
        src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
        className="w-32 rounded-full"
        alt="Avatar"
        width={128}
        height={128}
      />
      {!isEditing && (
        <p className="font-bold text-zuriGray-900 text-xl ">
          @{user?.nickname}
        </p>
      )}
      {isEditing && (
        <Input
          value={"arv"}
          className="max-w-28 p-2 !border-b border-gray-500 mb-4"
        />
      )}
    </div>
  );
};
