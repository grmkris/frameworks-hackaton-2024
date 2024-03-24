"use client";

import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

import { Link, User } from "../../schema";
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
  const { useGetUser } = useUser();
  const form = useForm<UserForm>();

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    console.log(data);
    try {
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          wallet: "0x899c5d6022725b02a39957Be50F08213eB2B0d75",
        }),
      }).then((res) => res.json());
    } catch (e) {
      toast("Error saving user", { type: "error" });
    }
  };

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

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col justify-center"
    >
      <div className="flex flex-col justify-start items-center relative gap-4">
        <UserProfile
          isEditing
          user={{
            nickname: "exampe",
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
        className="flex flex-row gap-1 bg-gray-800 text-white p-2 rounded-md px-8 w-fit my-2 self-center"
      >
        <FaSave color="#ffffff" />
        <p>Save</p>
      </Button>
    </form>
  );
};

export default NewUserPage;
