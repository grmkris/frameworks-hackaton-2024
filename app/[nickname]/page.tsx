import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";

import CustomLink, { CustomLinkProps } from "../components/CustomLink";
import Footer from "../components/Footer";
import { Spinner } from "../components/Spinner";
import { createDebugUrl, DEFAULT_DEBUGGER_HUB_URL } from "../debug";
import { useUser } from "../hooks/user.hook";
import { UserProfileScreen } from "../screens/UserProfile";

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

const state = {};

type State = {};

const initialState: State = {};

const reducer: FrameReducer<State> = (state, action) => {
  return {};
};

export default async function UserDetail({
  params,
}: {
  params: { nickname: string };
}) {
  const search = params.nickname;

  const previousFrame = getPreviousFrame(search);

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

  return (
    <div className="min-h-screen flex flex-col justify-start items-center relative">
      <UserProfileScreen nickname={search} />
      {/* <Link href={createDebugUrl("/[nickname]/page")}>Debug</Link> */}
      <FrameContainer
        pathname={`/${search}`}
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
              <img
                alt="Vercel"
                height={400}
                src="https://picsum.photos/200/300"
                width={600}
              />
              This is a user profile page of {search}
            </div>
          )}
        </FrameImage>
        <FrameButton action={"link"} target={"/"}>
          Twitter
        </FrameButton>
        <FrameButton action={"link"} target={"/"}>
          Facebook
        </FrameButton>
        <FrameButton action={"link"} target={"/"}>
          Instagram
        </FrameButton>
        <FrameButton action={"link"} target={"/"}>
          LinkedIn
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
