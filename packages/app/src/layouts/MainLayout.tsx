import React, { ReactNode } from 'react';
import { ENSName } from 'react-ens-name';
import { useWallet } from '@gimmixorg/use-wallet';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { connect, account } = useWallet();
  return (
    <>
      <header className="flex items-center justify-between h-16 p-5 ">
        <a href="/">
          <h1 className="font-ibm font-bold text-orange-500 text-xl">
            Prompty&hellip;
          </h1>
        </a>
        {!account ? (
          <button
            onClick={() => connect()}
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center">
            <a
              href="/prompt/create"
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mr-4"
            >
              + New prompt
            </a>
            <ENSName address={account} />
          </div>
        )}
      </header>
      <main className="md:w-1/2 mx-auto mt-5 pb-16 px-5">{children}</main>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;600&display=swap');

        body {
          background-color: #fdf4eb;
        }
      `}</style>
    </>
  );
};

export default MainLayout;
