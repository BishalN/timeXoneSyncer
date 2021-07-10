import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useCheckIfAlreadyLogin = () => {
  const { data, loading, error } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && data?.me) {
      router.replace("/dash");
    }
  }, [loading, data, router]);
};
