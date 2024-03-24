"use client";

import { Link } from "../../schema";
import CustomLink, { LinkType } from "../components/CustomLink";
import Footer from "../components/Footer";
import { Spinner } from "../components/Spinner";
import { UserProfile } from "../components/UserProfile";
import { useUser } from "../hooks/user.hook";

export const UserProfileScreen = ({ nickname }: { nickname: string }) => {
  const { useGetUser } = useUser();
  const userData = useGetUser({
    name: nickname as string,
  });

  if (userData.isLoading) return <Spinner />;

  const getLinkType = (link: string) => {
    if (link.includes("twitter")) return "twitter";
    if (link.includes("facebook")) return "facebook";
    if (link.includes("instagram")) return "instagram";
    if (link.includes("linkedin")) return "linkedin";
    if (link.includes("github")) return "github";
    return undefined;
  };

  console.log("userData", userData.data);

  return (
    <>
      <div className="flex flex-col gap-8">
        <UserProfile
          user={{
            nickname: nickname,
            image: userData?.data?.res?.image,
          }}
        />
        <div className="flex flex-col justify-center items-center gap-6 w-full px-4 sm:px-12 lg:px-36 pb-40">
          {userData?.data?.res?.links.map((link: Link) => (
            <CustomLink
              key={link.id}
              link={link}
              linkType={getLinkType(link.url)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
