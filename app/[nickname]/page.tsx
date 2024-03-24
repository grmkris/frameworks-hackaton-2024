import Link from "next/link";
import { eq } from "drizzle-orm";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";

import { UserTable } from "../../schema";
import { db } from "../api/user/route";
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

  // @ts-ignore
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
    // @ts-ignore
    previousFrame,
  );

  const userData = await db.query.UserTable.findFirst({
    where: eq(UserTable.name, search),
    with: {
      links: true,
    },
  });
  console.log("userData", userData);
  const buttons = userData?.links.map((link) => (
    <FrameButton key={link.title} action={"link"} target={link.url}>
      {link.title}
    </FrameButton>
  ));

  // @ts-ignore
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
              {userData?.image && (
                <img
                  alt="Vercel"
                  height={200}
                  src={userData?.image ?? "https://picsum.photos/200/300"}
                  width={400}
                />
              )}
              This is {search}'s page.
            </div>
          )}
        </FrameImage>

        {buttons}
      </FrameContainer>
    </div>
  );
}
