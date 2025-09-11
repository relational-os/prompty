import { useRouter } from "next/router";
import React from "react";
import { gql } from "urql";
import { useAuthorQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import PromptResponse from "../../../components/PromptResponse";
import MainLayout from "../../../layouts/MainLayout";
import { ENSName } from "react-ens-name";
import { PromptType } from "../../../types";

gql`
  query Author($id: ID!) {
    wallet(id: $id) {
      id
      prompts {
        id
        text
        startTime
        endTime
        minChars
        maxChars
        who {
          id
        }
        responseCount
      }
      responses {
        id
        text
        created
        prompt {
          id
          text
          who {
            id
          }
        }
      }
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const { address } = router.query;
  const addressStr = address as string;

  // const [query, refetch] = useAuthorQuery(
  const [query] = useAuthorQuery(
    typeof window === "undefined" || !addressStr || address == undefined
      ? { pause: true }
      : { variables: { id: addressStr } }
  );

  return (
    <MainLayout>
      <div className="index">
        <h1 className="text-4xl font-bold ml-5 mb-12 text-center">
          <ENSName address={address as string} />
        </h1>

        <h2 className="font-bold ml-5 mb-5">Prompts</h2>

        {query.data?.wallet?.prompts?.map((p: PromptType) => (
          <div key={p.id}>
            <Prompt prompt={p} />
          </div>
        ))}

        <h2 className="font-bold ml-5 mb-5">Responses</h2>

        {query.data?.wallet?.responses?.map((r) => (
          <div key={r.id}>
            {/* @ts-ignore */}
            <PromptResponse response={r} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .index {
        }
      `}</style>
    </MainLayout>
  );
};

export default Index;
