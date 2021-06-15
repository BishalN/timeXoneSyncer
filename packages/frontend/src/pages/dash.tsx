import React from "react";

import { useMeQuery } from "../generated/graphql";
import Logo from "../icons/logo";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface DashProps {}

const Dash: React.FC<DashProps> = () => {
  useIsAuth();
  const { data, loading, error } = useMeQuery();
  return (
    <div className="h-screen w-screen">
      {loading && <LoadingSpinner />}

      {/* {!loading && (
       
      )} */}
      <div className="w-1/4 h-full bg-primary-100 fixed">
        <div className="pt-2 mx-2">
          <div className="pt-4 mx-4">
            <Logo />
          </div>
          <div className="flex justify-center items-center mt-12 flex-col space-y-5 text-primary-900">
            <img
              className="rounded-full w-40"
              src={data.me?.profilePicture}
              alt={data.me?.username}
            />
            <span>{data.me?.username}</span>
            <p className="self-start mx-4 text-secondary text-xl mt-10">
              Recent searches
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo({})(Dash);
