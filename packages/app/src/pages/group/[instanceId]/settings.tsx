import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import { useLatestPromptsFromGroupQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import MainLayout from "../../../layouts/MainLayout";
import { PromptType } from "../../../types";
import { useRouter } from "next/router";
import { useState } from "react";

gql`
  query LatestPromptsFromGroup($id: ID!) {
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

  const [query] = useLatestPromptsFromGroupQuery(
    typeof window === "undefined" || instanceId == undefined
      ? { pause: true }
      : { variables: { id: instanceIdStr } }
  );

  const instanceData = query.data?.promptyInstances[0];

  // TODO do validation here
  const addResponder = () => {
    setAllowedResponders([...allowedResponders, newResponder]);
    setNewResponder("");
  };

  return (
    <>
      <Head>
        <title>{instanceData?.name}</title>
      </Head>

      <MainLayout>
        <span>{instanceData?.name} settings</span>
        <div className="flex flex-col bg-gray-500">
          <span>Responders</span>
          {allowedResponders.map((responder: string) => (
            <div>
              <span>{responder}</span>
            </div>
          ))}
          {addState != "none" && (
            <input
              className="bg-gray-300 p-1"
              value={newResponder}
              onChange={(e) => setNewResponder(e.target.value)}
            ></input>
          )}

          {addState == "none" ? (
            <button
              onClick={() => {
                setAddState("adding");
              }}
            >
              add member
            </button>
          ) : (
            <button
              onClick={() => {
                addResponder();
                setAddState("none");
              }}
            >
              confirm
            </button>
          )}
        </div>

        <button>save</button>
      </MainLayout>
    </>
  );
};

export default HomePage;
