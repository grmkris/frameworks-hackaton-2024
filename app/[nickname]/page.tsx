"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FrameButton, FrameContainer, FrameImage } from "frames.js/next/server";

import CustomLink, { CustomLinkProps } from "../components/CustomLink";
import Footer from "../components/Footer";
import { UserProfile } from "../components/UserProfile";
import { createDebugUrl, DEFAULT_DEBUGGER_HUB_URL } from "../debug";

export type UserType = {
  nickname: string;
  image?: string | null;
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
  const searchParams = useSearchParams();
  const search = searchParams?.get("nickname") ?? "";

  return (
    <div className="min-h-screen flex flex-col justify-start items-center relative">
      <UserProfile
        user={{
          nickname: search,
        }}
      />
      <div className="flex flex-col justify-center items-center gap-6 w-full px-4 sm:px-12 lg:px-36 pb-40">
        {mockLinkData.map((link) => (
          <CustomLink key={link.name} link={link} />
        ))}
      </div>
      <Footer />
      <Link href={createDebugUrl("/[nickname]/page")}>Debug</Link>
      <FrameContainer
        pathname="/"
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>
          {frameMessage ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              GM, {frameMessage.requesterUserData?.displayName}! Your FID is{" "}
              {frameMessage.requesterFid}
              {", "}
              {frameMessage.requesterFid < 20_000
                ? "you're OG!"
                : "welcome to the Farcaster!"}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              Say GM
            </div>
          )}
        </FrameImage>
        <FrameButton action={"link"} target={"/"}>
          Say GM
        </FrameButton>
        <FrameButton action={"link"} target={"/"}>
          Say GM
        </FrameButton>
        <FrameButton action={"link"} target={"/"}>
          Say GM
        </FrameButton>
        <FrameButton action={"link"} target={"/"}>
          Say GM
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
