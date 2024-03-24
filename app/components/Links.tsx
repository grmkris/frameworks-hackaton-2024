"use client"
import {usePrivy} from "@privy-io/react-auth";
import {useQuery} from "@tanstack/react-query";

export type Link = {
    id: number;
    url: string;
    title: string;
    description?: string;
    image?: string;
    owner: string;
}


export const LinkManager =  () => {
    const {ready, connectWallet, authenticated, login, user, logout} = usePrivy();
    if (!ready) {
        return <div>Loading...</div>;
    }

    if (authenticated && user?.wallet?.address) {
        return (
            <div>
                <Links connectedWallet={user.wallet.address}/>
                <CreateLink connectedWallet={user.wallet.address}/>
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



export const Links = (props: {
    connectedWallet: string;
}) => {
    const links = useQuery<Link[]>({
        queryKey: ['links', props.connectedWallet],
        queryFn: async () => {
            return fetch(`/api/links?owner=${props.connectedWallet}`).then((res) => res.json());
        }
    });
    return (
        <div>
            <h1>Links</h1>
            <ul>
                {links.data?.map((link) => (
                    <li key={link.id}>
                        <a href={link
                            .url}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const CreateLink = (props: {
    connectedWallet: string;
}) => {

    return (
        <div>
            <h1>Create Link</h1>
            <form>
                <input type="text" placeholder="URL" />
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Description" />
                <input type="text" placeholder="Image" />
                <input type="text" placeholder="Owner" />
                <button type="submit">Create Link</button>
            </form>
        </div>
    )
}
