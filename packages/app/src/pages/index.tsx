import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import MainLayout from "../layouts/MainLayout";
import { usePublicPromptyInstancesQuery } from "../codegen/subgraph";

gql`
  query PublicPromptyInstances {
    promptyInstances(first: 100) {
      id
      name
      allowedResponders {
        id
      }
    }
  }
`;

const HomePage: NextPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [query] = usePublicPromptyInstancesQuery(
    typeof window === "undefined" ? { pause: true } : {}
  );

  return (
    <>
      <Head>
        <title>Welcome to Prompty</title>
      </Head>

      <MainLayout>
        <span>these are all the public prompty groups!</span>
        <br></br>
        <button className="p-2 bg-gray-500 ">
          <a href="/group/create">Create a new group</a>
        </button>

        {query.data?.promptyInstances.map((p: any) => (
          <div className="p-4 bg-gray-400" key={p.id}>
            <a href={`/group/${p.id}`}>{p.name}</a>
          </div>
        ))}
      </MainLayout>
    </>
  );
};

export default HomePage;
