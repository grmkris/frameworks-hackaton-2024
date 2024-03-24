"use client"
import {usePrivy} from "@privy-io/react-auth";

export const ConnectWallet = () => {
    const {ready, connectWallet, authenticated, login, user, logout} = usePrivy();

    if (!ready) {
        return <div>Loading...</div>;
    }
    if (authenticated) {
        return (
            <div>
                <p>Connected as {JSON.stringify(user)}</p>
                <button onClick={logout}>Logout</button>
            </div>
        );

    }
    else {
        return (
            <div>
                <button onClick={connectWallet}>Connect Wallet</button>
                <button onClick={login}>Login</button>
            </div>

        );
    }
}
