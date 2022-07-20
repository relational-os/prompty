import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import { useLatestPromptsQuery } from "../codegen/subgraph";
import Prompt from "../components/Prompt";
import MainLayout from "../layouts/MainLayout";
import { PromptType } from "../types";

gql`
  query LatestPrompts {
    prompts(first: 10, orderBy: startTime, orderDirection: desc) {
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
  }
`;

const HomePage: NextPage = () => {
  const [query] = useLatestPromptsQuery(
    typeof window === "undefined" ? { pause: true } : {}
  );

  return (
    <>
      <Head>
        <title>Prompty</title>
      </Head>

      <MainLayout>
        {query.data?.prompts?.map((p: PromptType) => (
          <div key={p.id}>
            <Prompt prompt={p} />
          </div>
        ))}

        <style jsx>{``}</style>
      </MainLayout>
    </>
  );
};

export default HomePage;
