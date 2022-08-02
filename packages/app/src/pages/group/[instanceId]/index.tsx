import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import { useLatestPromptsFromGroupQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import MainLayout from "../../../layouts/MainLayout";
import { PromptType } from "../../../types";
import { useRouter } from "next/router";

gql`
  query LatestPromptsFromGroup($id: ID!) {
    promptyInstances(where: { id: $id }) {
      id
      name
      prompts(first: 10, orderBy: startTime, orderDirection: desc) {
        id
        who {
          id
        }
        text
        startTime
        endTime
        minChars
        maxChars
        responseCount
      }
    }
  }
`;

const HomePage: NextPage = () => {
  const router = useRouter();
  const { instanceId } = router.query;
  const instanceIdStr = instanceId as string;
  console.log({ instanceIdStr });

  const [query] = useLatestPromptsFromGroupQuery(
    typeof window === "undefined" || instanceId == undefined
      ? { pause: true }
      : { variables: { id: instanceIdStr } }
  );

  const instanceData = query.data?.promptyInstances[0];
  console.log(query);
  console.log(query.data?.promptyInstances[0]?.name);

  return (
    <>
      <Head>
        <title>{instanceData?.name}</title>
      </Head>

      <MainLayout>
        {instanceData?.prompts?.map((p: PromptType) => (
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
