import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import { useLatestPromptsQuery } from "../codegen/subgraph";
import Prompt from "../components/Prompt";
import MainLayout from "../layouts/MainLayout";

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
    }
  }
`;

const HomePage: NextPage = () => {
  const [query, refetch] = useLatestPromptsQuery(
    typeof window === "undefined" ? { pause: true } : {}
  );

  return (
    <>
      <Head>
        <title>Prompty</title>
      </Head>

      <MainLayout>
        <h2>Latest 10 Prompts</h2>
        {query.data?.prompts?.map((p: Prompt) => (
          <div key={p.id}>
            <Prompt prompt={p} />
          </div>
        ))}
        <div>
          <a href="/prompt/create" style={{ color: "blue" }}>
            Create a Prompt
          </a>
        </div>

        <style jsx>{``}</style>
      </MainLayout>
    </>
  );
};

export default HomePage;
