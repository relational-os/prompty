import { useRouter } from "next/router";
import React from "react";
import { gql } from "urql";
import { useAuthorQuery } from "../../../codegen/subgraph";

gql`
  query Author($id: ID!) {
    wallet(id: $id) {
      id
      prompts {
        id
        text
        startTime
        endTime
      }
      responses {
        id
        text
        prompt {
          id
          text
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
    <div className="index">
      <h1>Author {address}</h1>
      <b>
        <h2>Prompts</h2>
      </b>
      {query.data?.wallet?.prompts?.map((p) => (
        <div key={p.id}>
          Prompt ID: {p.id}
          <br />
          Prompt Text: {p.text}
          <br />
          Prompt Start: {p.startTime}
          <br />
          Prompt End: {p.endTime}
        </div>
      ))}
      <b>
        <h2>Responses</h2>
      </b>
      {query.data?.wallet?.responses?.map((r) => (
        <div key={r.id}>
          Response ID: {r.id}
          <br />
          Response Text: {r.text}
          <br />
          Prompt ID: {r.prompt?.id}
          <br />
          Prompt Text: {r.prompt?.text}
        </div>
      ))}

      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default Index;
