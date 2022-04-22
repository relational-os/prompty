import { useRouter } from "next/router";
import React from "react";
import { gql } from "urql";
import { useAuthorQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import PromptResponse from "../../../components/PromptResponse";
import MainLayout from "../../../layouts/MainLayout";

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

  const [query, refetch] = useAuthorQuery(
    typeof window === "undefined" || !addressStr || address == undefined
      ? { pause: true }
      : { variables: { id: addressStr } }
  );

  return (
    <MainLayout>
      <div className="index">
        <h1>Author {address}</h1>
        <b>
          <h2>Prompts</h2>
        </b>
        {query.data?.wallet?.prompts?.map((p: Prompt) => (
          <div key={p.id}>
            <Prompt prompt={p} />
          </div>
        ))}
        <b>
          <h2>Responses</h2>
        </b>
        {query.data?.wallet?.responses?.map((r) => (
          <div key={r.id}>
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
