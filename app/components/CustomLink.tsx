import Link from "next/link";

import { Link as LinkSchema } from "../../schema";
import LinkIcon from "./LinkIcon";

export type LinkType =
  | "twitter"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "github";

const CustomLink = ({
  link,
  linkType,
}: {
  link: LinkSchema;
  linkType?: LinkType;
}) => {
  return (
    <Link
      className="relative flex flex-row gap-2 items-center bg-emerald-100 border border-emerald-500 rounded-3xl p-4 min-w-96 justify-center"
      href={link.url}
      rel="noreferrer"
      target="_blank"
      id="btn__zuri"
    >
      <div className="absolute max-w-8 left-4">
        <LinkIcon type={linkType} />
      </div>
      <p>{link.title}</p>
    </Link>
  );
};

export default CustomLink;
