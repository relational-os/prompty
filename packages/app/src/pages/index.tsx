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
        <button>create new group btn</button>
      </MainLayout>
    </>
  );
};

export default HomePage;
