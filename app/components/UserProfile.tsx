import Image from "next/image";
import { UserType } from "../[nickname]/page";

export const UserProfile = ({ user }: { user: UserType }) => {
  return (
    <div className="mt-16 w-full flex flex-col justify-center items-center gap-6">
      <Image
        src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
        className="w-32 rounded-full"
        alt="Avatar"
        width={128}
        height={128}
      />
      <p className="font-bold text-zuriGray-900 text-xl ">@{user.nickname}</p>
    </div>
  );
};
