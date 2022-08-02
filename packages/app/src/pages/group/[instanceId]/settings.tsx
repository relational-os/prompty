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

  const [query] = useLatestPromptsFromGroupQuery(
    typeof window === "undefined" || instanceId == undefined
      ? { pause: true }
      : { variables: { id: instanceIdStr } }
  );

  const instanceData = query.data?.promptyInstances[0];
  const [allowedResponders, setAllowedResponders] = useState<string[]>([
    "0x1320490934",
  ]);

  const addResponder = () => {
    setAllowedResponders([...allowedResponders, ""]);
  };

  // todo: debounce & validation
  // after user stops ty ping, validate each address
  // possibly move to (string, bool) / (address, isValid)
  const setResponder = (index: number, value: string) => {
    const newAllowedResponders = [...allowedResponders];
    newAllowedResponders[index] = value;
    setAllowedResponders(newAllowedResponders);
  };

  const [isAdding, setIsAdding] = useState<boolean>(false);

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
          {isAdding && <input value="test" className="bg-gray-300 p-1"></input>}

          <button
            onClick={() => {
              setIsAdding(true);
            }}
          >
            add member
          </button>
        </div>

        <button>save</button>
      </MainLayout>
    </>
  );
};

export default HomePage;
