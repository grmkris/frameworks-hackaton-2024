import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getFrameMessage,
  getPreviousFrame,
  NextServerPageProps,
  useFramesReducer,
} from "frames.js/next/server";

import { User, UserTable } from "../../schema";
import { db } from "../api/user/route";
import CustomLink, { CustomLinkProps } from "../components/CustomLink";
import Footer from "../components/Footer";
import { UserProfile } from "../components/UserProfile";
import { createDebugUrl, DEFAULT_DEBUGGER_HUB_URL } from "../debug";

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

type State = {};

const initialState: State = {};

const reducer: FrameReducer<State> = (state, action) => {
  return {};
};

export default async function Home({ searchParams }: NextServerPageProps) {
  const previousFrame = getPreviousFrame(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame,
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT
  console.log("info: state is:", state);

  if (!searchParams?.nickname) throw new Error("No nickname provided");

  const res = await db.query.UserTable.findFirst({
    where: eq(UserTable.name, searchParams.nickname as string),
    with: {
      links: true,
    },
  });

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
      <Link href={createDebugUrl("/[nickname]/page")}>Debug</Link>
      <FrameContainer
        pathname={`/${searchParams.nickname}`}
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
