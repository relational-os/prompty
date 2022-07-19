import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { ENSName } from "react-ens-name";
import ReactMarkdown from "react-markdown";
import { gql } from "urql";
import { usePromptIdQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import { ABI, PROMPTY_ADDRESS } from "../../../contracts";
import MainLayout from "../../../layouts/MainLayout";
import TextareaAutosize from "react-textarea-autosize";
import {
  useAccount,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import { PromptResponseType } from "src/types";
import { useElapsedTime } from "use-elapsed-time";
import Spinner from "src/components/Spinner";
// @ts-ignore

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

const PENDING_TRANSACTION_LOADING_MESSAGE = "tx processing...";
const PENDING_WRITE_LOADING_MESSAGE = "Sign the message...";

interface ResponsesProps {
  responses: PromptResponseType[];
}

interface CharacterLabelProps {
  text: string;
  minChars?: number;
  maxChars?: number;
}

const CharacterLabel = ({ text, minChars, maxChars }: CharacterLabelProps) => {
  if (!minChars || !maxChars) return <span></span>;

  if (text.length < minChars) {
    return <span>{minChars - text.length}</span>;
  }

  if (minChars <= text.length && text.length < maxChars) {
    return (
      <span>
        {text.length}/{maxChars}
      </span>
    );
  }

  if (text.length >= maxChars) {
    return <span className="text-red-400">{maxChars - text.length}</span>;
  }

  return <span></span>;
};

const Responses = ({ responses }: ResponsesProps) => {
  return (
    <div>
      {/* @ts-ignore */}
      {responses?.length ? (
        <h2 className="font-bold ml-5 mb-5">{responses.length} responses</h2>
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

  // todo: some error states to figure out here
  // const { write, error, isError, data } = useContractWrite(
  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useContractWrite(
    {
      addressOrName: PROMPTY_ADDRESS,
      contractInterface: ABI,
    },
    "respond",
    {
      args: [idStr, text],
    }
  );

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    enabled: Boolean(data?.hash),
    confirmations: 2,
    hash: data?.hash,
    wait: data?.wait,
    onError(err) {
      console.error("error waiting for tx", err);
    },
    onSuccess(data) {
      // here: redirect to the page
      console.log("success", data);

      global.location.reload();
    },
  });

  const [query] = usePromptIdQuery(
    typeof window === "undefined" || id == undefined
      ? { pause: true }
      : { variables: { id: idStr } }
  );

  const minChars = query.data?.prompt?.minChars;
  const maxChars = query.data?.prompt?.maxChars;

  const responseIsValid =
    minChars && maxChars
      ? minChars <= text.length && text.length <= maxChars
      : false;

  // console.log(idStr, query?.data?.prompt);
  // @ts-ignore
  const promptResponses: PromptResponseType[] =
    query?.data?.prompt?.responses || [];

  const hasSelfReplied = useMemo(() => {
    if (query.data && query.data.prompt && query.data != undefined) {
      const selfRseponses = query.data.prompt.responses.filter(
        (response: any) => {
          return response.who.id == account?.address?.toLowerCase();
        }
      );
      return Boolean(selfRseponses.length);
    }
  }, [query]);

  const isPromptExpired = dayjs().isAfter(
    dayjs.unix(query.data?.prompt?.endTime)
  );

  const showAllResponses = useMemo(() => {
    // if logged in, and selfHasReplied before, view responses
    if (isPromptExpired) return true;
    if (account?.address && hasSelfReplied) return true;

    return false;
  }, [isPromptExpired, account?.address, hasSelfReplied]);

  // const renderCharactersLabel = useCallback(() => , [minChars, maxChars, text.length]);

  const submitResponse = async () => {
    if (provider) {
      write();
      // console.log({ data });
      // console.log({ isError });
      // console.log({ error });

      // if (error) {
      //   // @ts-ignore
      //   const decodedLogs = abiDecoder.decodeMethod(error.transaction.data);
      //   console.log({ decodedLogs });
      // }
      // const signer = await promptyContract.connect(provider.getSigner());

      // const tx = await signer.respond(idStr, text);
      // console.log("tx", tx.hash);
      // await tx.wait(2);
    } else {
      console.log("no provider");
    }
  };

  const isLoading = isLoadingWrite || isTransactionLoading;
  const { elapsedTime } = useElapsedTime({ isPlaying: isTransactionLoading });

  return (
    <MainLayout>
      <div>
        {query.data?.prompt != undefined && (
          // @ts-ignore
          <Prompt prompt={query.data.prompt} />
        )}
        {!hasSelfReplied &&
        query.data?.prompt?.endTime &&
        dayjs().isBefore(dayjs.unix(query.data?.prompt?.endTime)) ? (
          <div className="relative mb-10">
            <TextareaAutosize
              className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg pb-12 placeholder:text-gray-400"
              minRows={6}
              maxRows={14}
              placeholder="your response..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              disabled={!account}
            />
            {account && account?.address && (
              <div className="absolute bottom-4 left-4 py-2 text-sm font-bold text-gray-400">
                <ENSName address={account.address} />
              </div>
            )}
            <span className="absolute bottom-4 right-36 py-2 font-bold text-sm text-gray-400">
              <CharacterLabel
                text={text}
                minChars={minChars}
                maxChars={maxChars}
              ></CharacterLabel>
            </span>
            <button
              disabled={!account || isLoading || !responseIsValid}
              onClick={submitResponse}
              className="absolute bottom-5 right-3 rounded-full px-5 py-2 bg-orange-500 text-white text-sm font-bold disabled:opacity-50"
              type="submit"
            >
              {isLoading ? (
                <div className="flex">
                  <Spinner />
                  {isLoadingWrite ? PENDING_WRITE_LOADING_MESSAGE : ""}
                  {isTransactionLoading
                    ? `${PENDING_TRANSACTION_LOADING_MESSAGE} ${Math.round(
                        elapsedTime
                      )}s`
                    : ""}
                </div>
              ) : (
                "Respond"
              )}
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}>Prompt has ended</div>
        )}

        {showAllResponses ? (
          <Responses responses={promptResponses} />
        ) : (
          <div className="delay-fade text-center">
            There
            {promptResponses.length == 1
              ? " is 1 hidden response "
              : ` are ${promptResponses.length} hidden responses `}
            to this prompt.
            <br />
            Respond to reveal.
          </div>
        )}
      </div>

      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Index;
