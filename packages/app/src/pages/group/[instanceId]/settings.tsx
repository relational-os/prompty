import type { NextPage } from 'next';
import Head from 'next/head';
import { gql } from 'urql';
import { usePromptyInstanceByIdQuery } from '../../../codegen/subgraph';
import MainLayout from '../../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

gql`
  query PromptyInstanceById($id: ID!) {
    promptyInstances(where: { id: $id }) {
      id
      name
      allowedResponders {
        id
      }
    }
  }
`;

const HomePage: NextPage = () => {
  const router = useRouter();
  const { instanceId } = router.query;
  const instanceIdStr = instanceId as string;
  const [addState, setAddState] = useState<'none' | 'adding' | 'confirm'>(
    'none'
  );
  const [allowedResponders, setAllowedResponders] = useState<string[]>([
    '0x1320490934',
  ]);
  const [newResponder, setNewResponder] = useState<string>('');

  const [query] = usePromptyInstanceByIdQuery(
    typeof window === 'undefined' || instanceId == undefined
      ? { pause: true }
      : { variables: { id: instanceIdStr } }
  );

  const instanceData = query.data?.promptyInstances[0];
  const [groupName, setGroupName] = useState<string | undefined>(
    instanceData?.name
  );

  const [visibility, setVisibility] = useState<string>('public');
  const [description, setDescription] = useState<string>('');

  // TODO do validation here
  // ensure valid address, not a duplicate, etc
  const addResponder = () => {
    if (allowedResponders.includes(newResponder)) {
      setNewResponder('');
      return;
    }
    setAllowedResponders([...allowedResponders, newResponder]);
    setNewResponder('');
  };

  const removeResponder = (responder: string) => {
    setAllowedResponders(allowedResponders.filter((r) => r !== responder));
  };

  useEffect(() => {
    setGroupName(instanceData?.name);
    // setDescription(instanceData?.description);
  }, [instanceData?.name]);

  return (
    <>
      <Head>
        <title>{instanceData?.name} Settings</title>
      </Head>

      <MainLayout>
        <div className="w-8/12 mx-auto min-w-fit">
          <h1 className="text-center text-2xl mb-4">Settings</h1>

          <div className="mb-5 w-full">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Group Name
            </h4>
            <input
              className="w-full px-2 py-1 border-2 border-gray-200 rounded-md placeholder:text-gray-400"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            ></input>
          </div>

          <div className="mb-5 ">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Description
            </h4>
            <textarea
              rows={3}
              className="w-full p-2 border-2 border-gray-200 rounded-md placeholder:text-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-5 ">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
              Visibility
            </h4>
            <select
              className="w-full p-2 border-2 border-gray-200 rounded-md placeholder:text-gray-400 cursor-pointer"
              onChange={(e) => {
                setVisibility(e.target.value);
              }}
            >
              <option value="public" selected={visibility == 'public'}>
                Public
              </option>
              <option value="unlisted" selected={visibility == 'unlisted'}>
                Unlisted
              </option>
            </select>
          </div>

          <div className="mb-5">
            <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">Members</h4>
            <div className="w-full p-2 border-2 border-gray-200 rounded-md placeholder:text-gray-400 bg-white">
              {allowedResponders.map((responder: string) => (
                <div>
                  <span>{responder}</span>
                  <button
                    onClick={() => {
                      removeResponder(responder);
                    }}
                    className="pl-auto"
                  >
                    ❌
                  </button>
                </div>
              ))}
              {addState != 'none' && (
                <div>
                  <input
                    className="bg-gray-300 p-1"
                    value={newResponder}
                    onChange={(e) => setNewResponder(e.target.value)}
                  ></input>
                  <button
                    onClick={() => {
                      addResponder();
                      setAddState('none');
                    }}
                  >
                    ✅
                  </button>
                </div>
              )}
            </div>

            {addState == 'none' && (
              <button
                onClick={() => {
                  setAddState('adding');
                }}
              >
                add member
              </button>
            )}
          </div>

          <button>save</button>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
