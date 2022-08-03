import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import { usePromptyInstanceByIdQuery } from "../../../codegen/subgraph";
import MainLayout from "../../../layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

gql`
  query PromptyInstanceById($id: ID!) {
    promptyInstances(where: { id: $id }) {
      id
      name
      allowedResponders {
        id
      }
    }
  }
`;

const HomePage: NextPage = () => {
  const router = useRouter();
  const { instanceId } = router.query;
  const instanceIdStr = instanceId as string;
  const [addState, setAddState] = useState<"none" | "adding" | "confirm">(
    "none"
  );
  const [allowedResponders, setAllowedResponders] = useState<string[]>([
    "0x1320490934",
  ]);
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
  const [description, setDescription] = useState<string>("");

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
    setGroupName(instanceData?.name);
    // setDescription(instanceData?.description);
  }, [instanceData?.name]);

  return (
    <>
      <Head>
        <title>{instanceData?.name} Settings</title>
      </Head>

      <MainLayout>
        <span>{instanceData?.name} settings</span>

        <div>
          <label>Group Name</label>
          <input
            className="bg-gray-300 p-1"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows={3}
            className="bg-gray-300 p-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label>Visibility</label>
          <select
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

        <div className="flex flex-col bg-gray-500">
          <span>Responders</span>
          {allowedResponders.map((responder: string) => (
            <div>
              <span>{responder}</span>
              <button
                onClick={() => {
                  removeResponder(responder);
                }}
                className="pl-auto"
              >
                ❌
              </button>
            </div>
          ))}
          {addState != "none" && (
            <div>
              <input
                className="bg-gray-300 p-1"
                value={newResponder}
                onChange={(e) => setNewResponder(e.target.value)}
              ></input>
              <button
                onClick={() => {
                  addResponder();
                  setAddState("none");
                }}
              >
                ✅
              </button>
            </div>
          )}

          {addState == "none" && (
            <button
              onClick={() => {
                setAddState("adding");
              }}
            >
              add member
            </button>
          )}
        </div>

        <button>save</button>
      </MainLayout>
    </>
  );
};

export default HomePage;
