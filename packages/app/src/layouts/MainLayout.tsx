import React, { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useConnect();

  return (
    <>
      <header className="flex items-center justify-between h-16 p-5 ">
        <a href="/">
          <h1 className="font-ibm font-bold text-orange-500 text-xl">
            Prompty&hellip;
          </h1>
        </a>

        <div className="flex items-center">
          <ConnectButton />
          {isConnected && (
            <a
              href="/prompt/create"
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold ml-4"
            >
              + New prompt
            </a>
          )}
        </div>
        {/* {!account ? (
          <button
            onClick={() => connect()}
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold"
          >
            Connect Wallet
          </button>
        ) : (
        )} */}
      </header>
      <main className="md:w-1/2 mx-auto mt-5 pb-16 px-5">{children}</main>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;600&display=swap");

        body {
          background-color: #fdf4eb;
        }
      `}</style>
    </>
  );
};

export default MainLayout;
