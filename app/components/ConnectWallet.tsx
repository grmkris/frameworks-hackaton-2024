"use client";

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

export const ConnectWallet = () => {
  const { ready, connectWallet, authenticated, login, user, logout } =
    usePrivy();

  if (authenticated) {
    return (
      <div>
        <Button variant="outline" onClick={logout}>
          Disconnect
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row gap-4">
        <Button variant="outline" onClick={connectWallet}>
          Connect Wallet
        </Button>
        <Button variant="outline" onClick={login}>
          Login
        </Button>
      </div>
    );
  }
};
