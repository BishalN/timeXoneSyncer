import React from "react";
import Container from "../ui/components/Container";
import { Footer } from "../ui/components/Footer";
import { NavBar } from "../ui/components/NavBar";

import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebook, FaDiscord } from "react-icons/fa";
import { Button } from "../ui/components/Button";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const url = process.env.NEXT_PUBLIC_REST_API_URL;
  return (
    <>
      <Container>
        <NavBar />
        <div className="h-screen flex flex-col items-center justify-center">
          <div
            id="authWrapper"
            className="bg-primary-100 max-w-xl py-14 px-2 sm:px-10  rounded-xl space-y-4"
          >
            <h1 className="text-secondary text-6xl">Welcome</h1>
            <p className="ml-2">
              By logging in you accept our{" "}
              <span className="text-accent">Privacy Policy</span> and{" "}
              <span className="text-accent">Terms of Service.</span>
            </p>
            <div
              id="AuthButtonWrapper"
              className="ml-2 flex flex-col  space-y-4"
            >
              <Button
                title="Login with google"
                Icon={AiOutlineGoogle}
                endPoint={`${url}/auth/google`}
              />

              <Button
                title="Login with facebook"
                Icon={FaFacebook}
                endPoint={`${url}/auth/facebook`}
              />

              <Button
                title="Login with discord"
                Icon={FaDiscord}
                endPoint={`${url}/auth/discord`}
              />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default withApollo({})(register);
