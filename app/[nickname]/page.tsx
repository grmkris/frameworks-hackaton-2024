'use client'
import { useRouter } from "next/navigation";
import CustomLink, { CustomLinkProps } from "../components/CustomLink";
import Footer from "../components/Footer";
import { UserProfile } from "../components/UserProfile";

export type UserType = {
  nickname: string;
};

const mockLinkData: CustomLinkProps[] = [
  {
    name: "Twitter",
    type: "twitter",
  },
  {
    name: "Facebook",
    type: "facebook",
  },
  {
    name: "Instagram",
    type: "instagram",
  },
  {
    name: "LinkedIn",
    type: "linkedin",
  },
  {
    name: "Github",
    type: "github",
  },
  {
    name: "Portfolio",
  },
];

export default function UserDetail() {
  const router = useRouter();

  return (
    <div className="bg-zuriBg min-h-screen flex flex-col justify-start items-center gap-8 sm:gap-14 relative font-contact">
      <UserProfile
        user={{
          nickname: "MrRaccxxn",
        }}
      />
      <div className="flex flex-col justify-center items-center gap-6 w-full px-4 sm:px-12 lg:px-36 pb-40">
        {mockLinkData.map((link) => (
          <CustomLink key={link.name} link={link} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
