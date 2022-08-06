import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import { usePromptyInstanceByIdQuery } from "../../../codegen/subgraph";
import MainLayout from "../../../layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContractWrite, useProvider, useWaitForTransaction } from "wagmi";
import { ABI, PROMPTY_ADDRESS } from "src/contracts";
// import { defaultAbiCoder } from "ethers/lib/utils";
import { useElapsedTime } from "use-elapsed-time";
import Spinner from "src/components/Spinner";

const PENDING_TRANSACTION_LOADING_MESSAGE = "tx processing...";
const PENDING_WRITE_LOADING_MESSAGE = "Sign the message...";

gql`
  query PromptyInstanceById($id: ID!) {
    promptyInstances(where: { id: $id }) {
      id
      name
      description
      visible
      allowedResponders {
        id
      }
    }
  }
`;

const HomePage: NextPage = () => {
  const router = useRouter();
  const provider = useProvider();

  const { instanceId } = router.query;
  const instanceIdStr = instanceId as string;
  const [addState, setAddState] = useState<"none" | "adding" | "confirm">(
    "none"
  );
  const [allowedResponders, setAllowedResponders] = useState<string[]>([]);
  const [newResponder, setNewResponder] = useState<string>("");

  const [query] = usePromptyInstanceByIdQuery(
    typeof window === "undefined" || instanceId == undefined
      ? { pause: true }
      : { variables: { id: instanceIdStr } }
  );

  const instanceData = query.data?.promptyInstances[0];
  const [groupName, setGroupName] = useState<string | undefined>(
    instanceData?.name
  );

  const [visibility, setVisibility] = useState<string>("public");
  const [description, setDescription] = useState<string | undefined>("");
  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useContractWrite(
    {
      addressOrName: PROMPTY_ADDRESS,
      contractInterface: ABI,
    },
    "updateSettings",
    {
      args: [
        instanceIdStr,
        groupName,
        description,
        visibility == "public",
        allowedResponders,
      ],
    }
  );

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    enabled: Boolean(data?.hash),
    confirmations: 1,
    hash: data?.hash,
    wait: data?.wait,
    onError(err) {
      console.error("error waiting for tx", err);
    },
    onSuccess(data) {
      // here: redirect to the page
      console.log("success", data);

      // todo: explicitly refresh on solidity success
      // const event = defaultAbiCoder.decode(
      //   [
      //     'uint256',
      //     'address',
      //     'string',
      //     'uint256',
      //     'uint256',
      //     'uint128',
      //     'uint128',
      //   ],
      //   data.logs[0].data
      // );

      // router.push(`/group/${event[0].toString()}`);
      window.location.reload();

      // wait 30 seconds and then reload the page
      // setTimeout(() => {
      //   window.location.reload();
      // }, 30000);
    },
  });

  const isLoading = isLoadingWrite || isTransactionLoading;
  const { elapsedTime } = useElapsedTime({ isPlaying: isTransactionLoading });

  function updateSettings() {
    console.log("updateSettings");
    if (provider) {
      write();
    } else {
      console.log("no provider");
    }
  }

  // TODO do validation here
  // ensure valid address, not a duplicate, etc
  const addResponder = () => {
    if (allowedResponders.includes(newResponder)) {
      setNewResponder("");
      return;
    }
    setAllowedResponders([...allowedResponders, newResponder]);
    setNewResponder("");
  };

  const removeResponder = (responder: string) => {
    setAllowedResponders(allowedResponders.filter((r) => r !== responder));
  };

  useEffect(() => {
    if (instanceData) {
      setGroupName(instanceData?.name);
      setDescription(instanceData?.description);
      setVisibility(instanceData?.visible ? "public" : "unlisted");
      setAllowedResponders(
        instanceData?.allowedResponders?.map((r) => r.id) || []
      );
    }
  }, [instanceData?.name]);

  return (
    <>
      <Head>
        <title>{instanceData?.name} Settings</title>
      </Head>

      <MainLayout>
        <div className="w-8/12 mx-auto min-w-fit">
          <h1 className="text-center text-2xl mb-4">Settings</h1>

          <div className="mb-5 w-full">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Group Name
            </h4>
            <input
              className="w-full px-2 py-1 border-2 border-gray-200 rounded-md placeholder:text-gray-400"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            ></input>
          </div>

          <div className="mb-5 ">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Description
            </h4>
            <textarea
              rows={3}
              className="w-full p-2 border-2 border-gray-200 rounded-md placeholder:text-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-5 ">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Visibility
            </h4>
            <select
              className="w-full p-2 border-2 border-gray-200 rounded-md placeholder:text-gray-400 cursor-pointer"
              onChange={(e) => {
                setVisibility(e.target.value);
              }}
            >
              <option value="public" selected={visibility == "public"}>
                Public
              </option>
              <option value="unlisted" selected={visibility == "unlisted"}>
                Unlisted
              </option>
            </select>
          </div>

          <div className="mb-5 pt-4">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Allow List
            </h4>
            <div className="w-full p-2  rounded-md placeholder:text-gray-400 bg-white">
              {allowedResponders.map((responder: string) => (
                <div className="flex justify-between p-1">
                  <span>{responder}</span>
                  <button
                    onClick={() => {
                      removeResponder(responder);
                    }}
                    className="pl-auto"
                  >
                    <img
                      src="/assets/control-deleteMember.svg"
                      alt="Remove Member"
                      className="p-1 w-7"
                    />
                  </button>
                </div>
              ))}
              {addState != "none" && (
                <div className="relative">
                  <input
                    className="w-full px-2 py-1 border-2 border-gray-200 rounded-md placeholder:text-gray-400"
                    value={newResponder}
                    onChange={(e) => setNewResponder(e.target.value)}
                  ></input>
                  <button
                    onClick={() => {
                      addResponder();
                      setAddState("none");
                    }}
                  >
                    <img
                      src="/assets/img-enterNewMember-valid.svg"
                      alt="Valid Member"
                      className="p-1 w-7 absolute right-1 top-1"
                    />
                  </button>
                </div>
              )}
            </div>

            {addState == "none" && (
              <button
                onClick={() => {
                  setAddState("adding");
                }}
                className="text-orange-500 text-sm mt-2"
              >
                <img
                  src="/assets/control-addMember.svg"
                  alt="Add Member"
                  className="p-1 w-7 inline-block"
                />{" "}
                Add Member
              </button>
            )}
          </div>

          <button
            disabled={isLoading}
            onClick={updateSettings}
            className="rounded-full px-5 py-2 mt-8 bg-orange-500 text-white text-sm font-bold disabled:opacity-50"
            type="submit"
          >
            {isLoading ? (
              <div className="flex">
                <Spinner />
                {isLoadingWrite ? PENDING_WRITE_LOADING_MESSAGE : ""}
                {isTransactionLoading
                  ? `${PENDING_TRANSACTION_LOADING_MESSAGE} ${Math.round(
                      elapsedTime
                    )}s`
                  : ""}
              </div>
            ) : (
              "Update Settings"
            )}
          </button>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
