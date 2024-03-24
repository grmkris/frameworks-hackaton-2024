import Link from "next/link";
import LinkIcon from "./LinkIcon";

export type LinkType =
  | "twitter"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "github";

export type CustomLinkProps = {
  name: string;
  type?: LinkType;
};

const CustomLink = ({ link }: { link: CustomLinkProps }) => {
  return (
    <Link
      className="relative flex flex-row gap-2 items-center bg-emerald-100 border border-emerald-500 rounded-3xl p-4 min-w-96 justify-center"
      href="https://www.google.com/"
      rel="noreferrer"
      target="_blank"
      id="btn__zuri"
    >
      <div className="absolute max-w-8 left-4">
        <LinkIcon type={link.type} />
      </div>
      <p>{link.name}</p>
    </Link>
  );
};

export default CustomLink;
