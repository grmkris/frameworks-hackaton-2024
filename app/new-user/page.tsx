"use client";

import { User } from "../../schema";
import { UserProfile } from "../components/UserProfile";
import { useUser } from "../hooks/user.hook";
import { LinkInput } from "./linkInput";

const NewUserPage = () => {
  const { useGetUser } = useUser();

  const userData = useGetUser({
    name: "Ayrton",
    wallet: "0x899c5d6022725b02a39957Be50F08213eB2B0d75",
  }).data;

  console.log("user data", userData);

  //   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const name = "TODO";
  //     const wallet = props.connectedWallet;
  //     const image = "TODO";

  //     const res = await fetch("/api/user", {
  //       method: "POST",
  //       body: JSON.stringify({ name, wallet, image }),
  //     }).then((res) => res.json());
  //     console.log(res);

  //     await queryClient.invalidateQueries();
  //   };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center relative gap-4">
      <UserProfile
        isEditing
        user={{
          nickname: "exampe",
        }}
      />
      <LinkInput />
      {/* <div className="flex flex-col justify-center items-center gap-6 w-full px-4 sm:px-12 lg:px-36 pb-40">
        {mockLinkData.map((link) => (
          <CustomLink key={link.name} link={link} />
        ))}
      </div>
      <Footer /> */}
    </div>
  );
};

export default NewUserPage;
