import React from "react";
import Container from "../ui/components/Container";
import { Footer } from "../ui/components/Footer";
import { NavBar } from "../ui/components/NavBar";

import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook, FaDiscord } from "react-icons/fa";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
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
              <button className="bg-primary-200 p-4 sm:w-11/12 rounded-lg space-x-2 flex justify-center items-center focus:ring-2 focus:ring-secondary ">
                <AiOutlineGoogle size="2em" />
                <span>Login with google</span>
              </button>

              <button className="bg-primary-200 p-4 sm:w-11/12 space-x-2 rounded-lg flex items-center justify-center focus:ring-2 focus:ring-secondary ">
                <FaFacebook size="2em" />
                <span>Login with facebook</span>
              </button>

              <button className="bg-primary-200 p-4 sm:w-11/12 space-x-2 rounded-lg flex items-center justify-center focus:ring-2 focus:ring-secondary ">
                <AiOutlineTwitter size="2em" />
                <span>Login with twitter</span>
              </button>

              <button className="bg-primary-200 p-4 sm:w-11/12 space-x-2 rounded-lg flex items-center justify-center focus:ring-2 focus:ring-secondary ">
                <FaDiscord size="2em" />
                <span>Login with discord</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default register;
