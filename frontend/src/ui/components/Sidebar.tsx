import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../icons/logo";
import { GenericButton } from "./GenericButton";
import { useRouter } from "next/router";

interface sidebarProps {
  username: string;
  profilePictureUri: string;
  message?: string;
}

export const Sidebar: React.FC<sidebarProps> = ({
  profilePictureUri,
  username,
  message,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const router = useRouter();
  return (
    <>
      {!isSidebarOpen && (
        <GiHamburgerMenu
          className="sm:ml-6 md:hidden"
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
        <div
          className="w-3/4 sm:w-1/2 md:w-1/4 h-screen bg-primary-100 fixed"
          onClick={() => toggleSidebar()}
        >
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
                src={profilePictureUri}
                alt={username}
              />
              <span className="capitalize text-xl">{username}</span>
              <p className="self-start mx-4 text-secondary text-xl mt-10">
                Goto:
              </p>
            </div>
            <div className="flex flex-col ml-4 justify-between">
              <GenericButton
                title="Sync Time"
                onClick={() => {
                  router.push("/sync");
                }}
              />
              <GenericButton
                title="Set Reminders"
                onClick={() => {
                  router.push("/reminder");
                }}
              />
              {message.length > 1 ? (
                <div>
                  <p className="self-end text-accent text-sm mt-10">
                    {message}
                  </p>
                  <a
                    href="https://web.dev/notification-triggers/"
                    target="_blank"
                    className="hover:text-accent text-secondary"
                  >
                    Enable notification trigger to be notified
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
