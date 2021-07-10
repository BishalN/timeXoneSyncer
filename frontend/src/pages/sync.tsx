import { useRouter } from "next/router";
import React from "react";

import { useMeQuery } from "../generated/graphql";
import Logo from "../icons/logo";
import { SyncSvg } from "../illustrations/syncPage";
import Container from "../ui/components/Container";
import { GenericButton } from "../ui/components/GenericButton";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { Selector } from "../ui/Selector";
import { withApollo } from "../utils/withApollo";

const sync: React.FC = ({}) => {
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Container>
        <div id="NavBar" className="flex justify-between items-center mx-2">
          <Logo />
          <img
            className="rounded-full ring-4 ring-primary-100 h-20 w-20"
            src={data.me.profilePicture}
            alt={data.me.username}
          />
        </div>
        <div className="mt-4">
          <GenericButton
            title="Go back to dashboard"
            onClick={() => router.push("/dash")}
          />
        </div>
        <div
          id="welcomeContentWrapper"
          className="mx-2 mt-10 xl:mt-16 text-primary-600
           text-lg space-y-2 flex justify-between items-center"
        >
          <div className="space-y-1 leading-7">
            <span>Hi {data.me.username}!</span>
            <p className="max-w-sm text-4xl font-bold text-secondary xl:text-5xl xl:max-w-lg">
              Compare different time zones and gain insight now
            </p>
          </div>
          <SyncSvg />
        </div>
        <Selector />
      </Container>
    </div>
  );
};

export default withApollo({ ssr: false })(sync);
