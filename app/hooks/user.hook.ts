"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { User } from "../../schema";
import { UserForm } from "../new-user/page";

export const useUser = () => {
  const useGetUser = ({ name, wallet }: { name?: string; wallet?: string }) => {
    return useQuery({
      queryKey: ["useGetUser"],
      queryFn: () => {
        return fetch(`/api/user?wallet=${wallet}&name=${name}`).then((res) =>
          res.json(),
        );
      },
    });
  };


  return {
    useGetUser,
  };
};
