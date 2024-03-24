"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePrivy } from "@privy-io/react-auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { FaSave } from "react-icons/fa";

import { Link, User } from "../../schema";
import { ConnectWallet } from "../components/ConnectWallet";
import { Spinner } from "../components/Spinner";
import { UserProfile } from "../components/UserProfile";
import { useUser } from "../hooks/user.hook";
import { LinkInput } from "./LinkInput";

export type LinkForm = {
  title: string;
  url: string;
};

export type UserForm = {
  name: string;
  image?: string;
  links: LinkForm[];
};

const NewUserPage = () => {
  const { toast } = useToast();
  const { useGetUser } = useUser();
  const { user } = usePrivy();
  const form = useForm<UserForm>();
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    if (!user?.wallet?.address) {
      toast({
        title: "Not wallet provided",
      });
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          wallet: user?.wallet?.address,
          image: user?.farcaster?.pfp,
        }),
      }).then((res) => res.json());

      toast({
        title: "Profile created successfully!",
      });
      router.push(`/${data.name}`);
    } catch (e) {
      toast({
        title: `Something were wrong trying to create the user: ${e}`,
      });
    }
  };

  const userData = useGetUser({
    wallet: user?.wallet?.address,
  });

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const name = "TODO";
  //   const wallet = props.connectedWallet;
  //   const image = "TODO";

  //   const res = await fetch("/api/user", {
  //     method: "POST",
  //     body: JSON.stringify({ name, wallet, image }),
  //   }).then((res) => res.json());
  //   console.log(res);

  //   await queryClient.invalidateQueries();
  // };

  if (!ready) return <Spinner />;

  return (
    <div>
      {authenticated ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
        >
          <div className="w-full flex justify-end p-4">
            <ConnectWallet />
          </div>
          <div className="flex flex-col justify-start items-center relative gap-4">
            <UserProfile
              isEditing
              user={{
                nickname: user?.farcaster?.displayName ?? userData.data?.name,
                image: user?.farcaster?.pfp,
              }}
              form={form}
            />
            <LinkInput form={form} />
            {/* <div className="flex flex-col justify-center items-center gap-6 w-full px-4 sm:px-12 lg:px-36 pb-40">
        {mockLinkData.map((link) => (
          <CustomLink key={link.name} link={link} />
        ))}
      </div>
      <Footer /> */}
          </div>
          <Button
            type="submit"
            className="flex justify-center items-center p-2 rounded-md px-8 w-fit my-2 self-center"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <div className="flex flex-row gap-2 bg-gray-800 text-white items-center">
                <FaSave color="#ffffff" />
                <p>Save</p>
              </div>
            )}
          </Button>
        </form>
      ) : (
        <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
          <CiWarning color="#008000" size={80} />
          <p className="text-danger-500 text-md">
            Connect your wallet to create your profile
          </p>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
};

export default NewUserPage;
