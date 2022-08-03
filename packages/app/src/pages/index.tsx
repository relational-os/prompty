import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";
import MainLayout from "../layouts/MainLayout";
import { usePublicPromptyInstancesQuery } from "../codegen/subgraph";
import Link from "next/link";

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
        <Link href="/group/create">
          <a className="p-2 bg-gray-500">Create a new group</a>
        </Link>

        {query.data?.promptyInstances.map((p: any) => (
          <div className="p-4 bg-gray-400" key={p.id}>
            <Link href={`/group/${p.id}`}>{p.name}</Link>
          </div>
        ))}
      </MainLayout>
    </>
  );
};

export default HomePage;
