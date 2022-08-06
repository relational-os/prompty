import React, { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import { useRouter } from "next/router";
import { useLatestPromptsFromGroupQuery } from "src/codegen/subgraph";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isConnected } = useConnect();
  const { instanceId } = router.query;
  const instanceIdStr = instanceId as string;

  const [query] = useLatestPromptsFromGroupQuery(
    typeof window === "undefined" || instanceId == undefined
      ? { pause: true }
      : { variables: { id: instanceIdStr } }
  );

  const instanceData = query.data?.promptyInstances[0];

  return (
    <>
      {instanceId ? (
        <header className="flex items-center justify-between h-16 p-5 ">
          <a href={instanceId ? `/group/${instanceIdStr}` : "/"}>
            <h1 className="font-ibm font-bold text-orange-500 text-xl">
              {instanceData?.name}&hellip;
            </h1>
          </a>

          <div className="flex items-center">
            <ConnectButton />
            {isConnected && (
              <div>
                <a
                  href={`/group/${instanceIdStr}/prompt/create`}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold ml-4"
                >
                  + New prompt
                </a>
                <a href={`/group/${instanceId}/settings`}>settings</a>
              </div>
            )}
          </div>
        </header>
      ) : (
        <header className="flex items-center justify-between h-16 p-5 ">
          <a href={instanceId ? `/group/${instanceIdStr}` : "/"}>
            <h1 className="font-ibm font-bold text-orange-500 text-xl">
              Prompty&hellip;
            </h1>
          </a>

          <div className="flex items-center">
            <ConnectButton />
            {isConnected && !window.location.href.includes("/author/") && (
              <a
                href="/group/create"
                className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold ml-4"
              >
                + New group
              </a>
            )}
          </div>
        </header>
      )}

      <main className="md:w-1/2 mx-auto mt-10 pb-16 px-5">{children}</main>
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
