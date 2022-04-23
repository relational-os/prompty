import { useWallet } from '@gimmixorg/use-wallet';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ENSName } from 'react-ens-name';
import ReactMarkdown from 'react-markdown';
import { gql } from 'urql';
import { usePromptIdQuery } from '../../../codegen/subgraph';
import Prompt from '../../../components/Prompt';
import { promptyContract } from '../../../contracts';
import MainLayout from '../../../layouts/MainLayout';
import TextareaAutosize from 'react-textarea-autosize';

gql`
  query PromptID($id: ID!) {
    prompt(id: $id) {
      id
      who {
        id
      }
      text
      startTime
      endTime
      minChars
      maxChars
      responses {
        id
        who {
          id
        }
        text
      }
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const idStr = id as string;
  const [text, setText] = useState('');

  const { account, connect, provider } = useWallet();

  const [query, refetch] = usePromptIdQuery(
    typeof window === 'undefined' || id == undefined
      ? { pause: true }
      : { variables: { id: idStr } }
  );

  console.log(idStr, query?.data?.prompt);

  const submitResponse = async () => {
    if (provider) {
      console.log('provider');
      const signer = await promptyContract.connect(provider.getSigner());

      const tx = await signer.respond(idStr, text);
      console.log('tx', tx.hash);
      await tx.wait(2);
    } else {
      console.log('no provider');
    }
  };

  return (
    <MainLayout>
      <div>
        {query.data?.prompt != undefined && (
          <Prompt prompt={query.data.prompt} />
        )}
        {query.data?.prompt?.endTime &&
        dayjs().isBefore(dayjs.unix(query.data?.prompt?.endTime)) ? (
          <div className="relative ">
            <TextareaAutosize
              className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg pb-12 placeholder:text-gray-400"
              minRows={6}
              maxRows={14}
              placeholder="your response..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              disabled={!account}
            />
            {account && (
              <div className="absolute bottom-4 left-4 py-2 text-sm font-bold text-gray-400">
                <ENSName address={account} />
              </div>
            )}

            <button
              onClick={() => {
                !account ? connect() : submitResponse();
              }}
              className="absolute bottom-5 right-3 rounded-full px-5 py-2 bg-orange-400 text-white text-sm font-bold"
              type="submit"
            >
              {!account ? 'Connect Wallet' : 'Respond'}
            </button>
          </div>
        ) : (
          <div>Prompt has ended</div>
        )}
        <b>
          <h2>Prompt Responses</h2>
        </b>
        {query.data?.prompt?.responses?.map((r) => (
          <div key={r.id}>
            <a href={`/author/${r.who?.id}`}>
              <ENSName address={r.who?.id} />
            </a>
            <br />
            Reponse Text:
            <ReactMarkdown>{r.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Index;
