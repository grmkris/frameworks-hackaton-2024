"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export const Privy = (props: { children: React.ReactNode }) => {
  return (
    <PrivyProvider appId={"clu4ryx3q0067sa3zjm3wfnhf"}>
      {props.children}
    </PrivyProvider>
  );
};
