import { useRouter } from "next/router";
import React from "react";
import { gql } from "urql";
import { usePromptIdQuery } from "../../../codegen/subgraph";
import { useWallet } from "../../../useWallet";

gql`
  query PromptID($id: ID!) {
    prompt(id: $id) {
      id
      who {
        id
      }
      text
      startTime
      endTime
      responses {
        id
        who {
          id
        }
        text
      }
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const idStr = id as string;

  const { account } = useWallet();

  const [query, refetch] = usePromptIdQuery(
    typeof window === "undefined" || !account || id == undefined
      ? { pause: true }
      : { variables: { id: idStr } }
  );

  return (
    <div className="index">
      <h1>Prompt {id}</h1>
      <div>
        <b>
          <h2>Prompt Info</h2>
        </b>
        Prompt Text: {query.data?.prompt?.text}
        <br />
        Who Prompted: {query.data?.prompt?.who?.id}
        <br />
        Start: {query.data?.prompt?.startTime}
        <br />
        End: {query.data?.prompt?.endTime}
        <br />
        <b>
          <h2>Prompt Responses</h2>
        </b>
        {query.data?.prompt?.responses?.map((r) => (
          <div key={r.id}>
            Responder: {r.who?.id}
            <br />
            Reponse Text: {r.text}
          </div>
        ))}
      </div>
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default Index;
