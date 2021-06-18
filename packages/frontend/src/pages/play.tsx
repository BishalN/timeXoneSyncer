import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../icons/logo";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface playProps {}

const play: React.FC<playProps> = ({}) => {
  const { data, loading, error } = useMeQuery();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {!isSidebarOpen && (
        <GiHamburgerMenu
          className="md:hidden"
          size={40}
          onClick={() => {
            toggleSidebar();
            console.log(isSidebarOpen);
          }}
        />
      )}
      <div
        className={`${
          isSidebarOpen ? "absolute top-0 left-0" : "hidden"
        } md:block `}
      >
        {!loading && (
          <div className="md:w-1/4 h-screen bg-primary-100 fixed">
            {isSidebarOpen && (
              <AiOutlineClose
                className="md:hidden mt-2 mx-2 cursor-pointer text-accent"
                size={20}
                onClick={() => {
                  toggleSidebar();
                  console.log(isSidebarOpen);
                }}
              />
            )}
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
                <span className="capitalize text-xl">{data.me?.username}</span>
                <p className="self-start mx-4 text-secondary text-xl mt-10">
                  Recent searches
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withApollo({})(play);
