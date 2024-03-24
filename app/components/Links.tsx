"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { User } from "../../schema";

export type Link = {
  id: number;
  url: string;
  title: string;
  description?: string;
  image?: string;
  owner: string;
};

export const LinkManager = () => {
  const { ready, connectWallet, authenticated, login, user, logout } =
    usePrivy();
  if (!ready) {
    return <div>Loading...</div>;
  }

  if (authenticated && user?.wallet?.address) {
    return (
      <div>
        <Links connectedWallet={user.wallet.address} />
        <CreateUser connectedWallet={user.wallet.address} />
        <CreateLink connectedWallet={user.wallet.address} />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
        <button onClick={login}>Login</button>
      </div>
    );
  }
};

export const Links = (props: { connectedWallet?: string; name?: string }) => {
  const links = useQuery<{
    res: User;
  }>({
    queryKey: ["links", props.connectedWallet],
    queryFn: async () => {
      return fetch(`/api/user?wallet=${props.connectedWallet}`).then((res) =>
        res.json(),
      );
    },
  });

  const linksByName = useQuery<{
    res: User;
  }>({
    queryKey: ["links", props.name],
    queryFn: async () => {
      return fetch(`/api/user?name=${props.name}`).then((res) => res.json());
    },
  });

  console.log("links.data", links.data?.res.links);
  return (
    <div>
      <h1>Links</h1>
      <ul>
        {links.data?.res.links?.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CreateLink = (props: { connectedWallet: string }) => {
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "TODO";
    const title = "TODO";
    const user = props.connectedWallet;

    const res = await fetch("/api/link", {
      method: "POST",
      body: JSON.stringify({ url, title, user }),
    }).then((res) => res.json());
    console.log(res);

    await queryClient.invalidateQueries();
  };

  return (
    <div>
      <h1>Create Link</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="URL" />
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Image" />
        <input type="text" placeholder="Owner" />
        <button type="submit">Create Link</button>
      </form>
    </div>
  );
};

export const CreateUser = (props: { connectedWallet: string }) => {
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = "TODO";
    const image = "TODO";
    const wallet = props.connectedWallet;

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, image, wallet }),
    }).then((res) => res.json());
    console.log(res);

    await queryClient.invalidateQueries();
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Wallet" />
        <input type="text" placeholder="Image" />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};
