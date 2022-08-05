import type { NextPage } from 'next';
import Head from 'next/head';
import { gql } from 'urql';
import MainLayout from '../layouts/MainLayout';
import { usePublicPromptyInstancesQuery } from '../codegen/subgraph';
import Link from 'next/link';
import Image from 'next/image';

gql`
  query PublicPromptyInstances {
    promptyInstances(first: 100) {
      id
      name
      description
      allowedResponders {
        id
      }
    }
  }
`;

const HomePage: NextPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [query] = usePublicPromptyInstancesQuery(
    typeof window === 'undefined' ? { pause: true } : {}
  );

  return (
    <>
      <Head>
        <title>Welcome to Prompty!</title>
      </Head>

      <MainLayout>
        <h2 className="text-center text-2xl text-orange-500 font-bold mb-7">
          Prompty is a collaborative prompting
          <br />
          game system for together fun.
        </h2>

        {/* <Link href="/group/create">
          <a className="p-2 bg-gray-500">Create a new group</a>
        </Link> */}

        {query.data?.promptyInstances.map((p: any) => (
          <Link href={`/group/${p.id}`}>
            <div
              className="p-4 pb-2 mb-5 bg-white flex w-full cursor-pointer rounded-xl "
              key={p.id}
            >
              <img
                src="/assets/img-group-buzzard.png"
                className="w-12 h-12 rounded-sm mr-4"
              />
              <div className="flex flex-col w-full">
                <div className="flex flex-row mb-2">
                  <h2 className="grow font-bold text-orange-500">{p.name}</h2>
                  <span className="flex flex-row mr-2">
                    <small className="whitespace-nowrap mr-2 opacity-60">
                      3 active prompts
                    </small>
                    {/* TODO: add unlisted icon */}
                    <img
                      src="/assets/img-groupStatus-global.svg"
                      className="w-5"
                    />
                  </span>
                </div>

                <p>This is a description of the life purpose of the group.</p>
              </div>
            </div>
          </Link>
        ))}
      </MainLayout>
    </>
  );
};

export default HomePage;
