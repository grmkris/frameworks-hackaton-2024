"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

import { User } from "../../schema";

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

  // const useRegisterUser = () => {
  //     useMutation({
  //         mutationFn: () => {
  //             return fetch('/api/user', {
  //                 method: 'POST',
  //                 body: JSON.stringify({ name, wallet, image }),
  //             }).then(res => res.json())
  //         },
  //         onSuccess: () => {
  //           // Invalidate and refetch

  //         },
  //       })
  // }

  return {
    useGetUser,
  };
};
