import type { NextPage } from 'next';
import Head from 'next/head';
import { gql } from 'urql';
import { useLatestPromptsQuery } from '../codegen/subgraph';
import Prompt from '../components/Prompt';
import MainLayout from '../layouts/MainLayout';

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
    typeof window === 'undefined' ? { pause: true } : {}
  );

  return (
    <>
      <Head>
        <title>Prompty</title>
      </Head>

      <MainLayout>
        {query.data?.prompts?.map((p: Prompt) => (
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
