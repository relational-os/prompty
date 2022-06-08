import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { ENSName } from "react-ens-name";
import ReactMarkdown from "react-markdown";
import { gql } from "urql";
import { usePromptIdQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import { ABI, PROMPTY_ADDRESS } from "../../../contracts";
import MainLayout from "../../../layouts/MainLayout";
import TextareaAutosize from "react-textarea-autosize";
import { useAccount, useContractWrite, useProvider } from "wagmi";
import { PromptResponseType } from "src/types";

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

interface ResponsesProps {
  responses: PromptResponseType[];
}

const Responses = ({ responses }: ResponsesProps) => {
  return (
    <div>
      {/* @ts-ignore */}
      {responses?.length ? (
        <h2 className="font-bold ml-5 mb-5">Responses</h2>
      ) : (
        <div />
      )}

      {responses.map((r) => (
        <div key={r.id} className="p-6 bg-white rounded-xl mb-5">
          {" "}
          <div className="mb-5">
            <ReactMarkdown>{r.text}</ReactMarkdown>
          </div>
          &mdash;{" "}
          <a
            href={`/author/${r.who?.id}`}
            className="text-gray-600 text-sm font-bold opacity-7 border-b-2 border-transparent hover:border-orange-300"
          >
            <ENSName address={r.who?.id} />
          </a>
        </div>
      ))}
    </div>
  );
};

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const idStr = id as string;
  const [text, setText] = useState("");
  const provider = useProvider();
  const { data: account } = useAccount();

  const { write } = useContractWrite(
    {
      addressOrName: PROMPTY_ADDRESS,
      contractInterface: ABI,
    },
    "respond",
    {
      args: [idStr, text],
    }
  );

  const [query] = usePromptIdQuery(
    typeof window === "undefined" || id == undefined
      ? { pause: true }
      : { variables: { id: idStr } }
  );

  const isLoading = query.fetching && !query.data?.prompt;
  // @ts-ignore
  const promptResponses: PromptResponseType[] =
    query?.data?.prompt?.responses || [];
  const isPromptExpired = dayjs().isAfter(
    dayjs.unix(query.data?.prompt?.endTime)
  );
  const hasUserResponse = useMemo(
    () =>
      Boolean(
        query.data?.prompt?.responses?.find(
          (resp) =>
            resp.who.id?.toLowerCase() === account?.address?.toLowerCase()
        )
      ),
    [promptResponses, account?.address]
  );

  // Doesn't actually need to be memoized, just allows for easy containment of logic.
  const showRespnoses = useMemo(() => {
    if (!isPromptExpired) return true;
    if (hasUserResponse) return true;
    if (!account?.address) return false;

    return false;
  }, [isPromptExpired, account?.address, hasUserResponse]);

  const submitResponse = async () => {
    if (provider) {
      write();

      // const signer = await promptyContract.connect(provider.getSigner());

      // const tx = await signer.respond(idStr, text);
      // console.log("tx", tx.hash);
      // await tx.wait(2);
    } else {
      console.log("no provider");
    }
  };

  return (
    <MainLayout>
      <div>
        {query.data?.prompt != undefined ? (
          // @ts-ignore
          <Prompt prompt={query.data.prompt} />
        ) : (
          <div />
        )}
        {!isPromptExpired && query.data?.prompt != undefined ? (
          <div className="relative mb-10">
            <TextareaAutosize
              className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg pb-12 placeholder:text-gray-400"
              minRows={6}
              maxRows={14}
              placeholder="your response..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            {account && account?.address && (
              <div className="absolute bottom-4 left-4 py-2 text-sm font-bold text-gray-400">
                <ENSName address={account.address} />
              </div>
            )}
            <button
              onClick={submitResponse}
              className="absolute bottom-5 right-3 rounded-full px-5 py-2 bg-orange-500 text-white text-sm font-bold"
              type="submit"
              disabled={!account}
            >
              {"Respond"}
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}>Prompt has ended</div>
        )}

        {showRespnoses && <Responses responses={promptResponses} />}
      </div>

      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Index;
