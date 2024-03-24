import { LinkType } from "./CustomLink";
import {
  RiTwitterXFill,
  RiFacebookFill,
  RiInstagramFill,
  RiGithubFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { PiGlobeFill } from "react-icons/pi";
import { ReactNode } from "react";

const LinkIcon = ({ type }: { type?: LinkType }) => {
  if (!type) return <PiGlobeFill />;

  const mappingIconTypeWithElement: { [key in LinkType]: ReactNode } = {
    twitter: <RiTwitterXFill />,
    facebook: <RiFacebookFill />,
    instagram: <RiInstagramFill />,
    github: <RiGithubFill />,
    linkedin: <RiLinkedinFill />,
  };

  return mappingIconTypeWithElement[type];
};

export default LinkIcon;
