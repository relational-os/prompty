import { useWallet } from "@gimmixorg/use-wallet";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ENSName } from "react-ens-name";
import { gql } from "urql";
import { usePromptIdQuery } from "../../../codegen/subgraph";
import Prompt from "../../../components/Prompt";
import { promptyContract } from "../../../contracts";
import MainLayout from "../../../layouts/MainLayout";

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
  const [text, setText] = useState("");

  const { account, connect, provider } = useWallet();

  const [query, refetch] = usePromptIdQuery(
    typeof window === "undefined" || id == undefined
      ? { pause: true }
      : { variables: { id: idStr } }
  );

  console.log(idStr, query?.data?.prompt);

  const submitResponse = async () => {
    if (provider) {
      console.log("provider");
      const signer = await promptyContract.connect(provider.getSigner());

      const tx = await signer.respond(idStr, text);
      console.log("tx", tx.hash);
      await tx.wait(2);
    } else {
      console.log("no provider");
    }
  };

  return (
    <MainLayout>
      <div className="index">
        <h1>Prompt {id}</h1>
        <div>
          {query.data?.prompt != undefined && (
            <Prompt prompt={query.data.prompt} />
          )}
          {query.data?.prompt?.endTime &&
          dayjs().isBefore(dayjs.unix(query.data?.prompt?.endTime)) ? (
            <div>
              {account && (
                <div>
                  <textarea
                    className="border border-gray-500 p-2 mx-4"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                </div>
              )}
              <button
                onClick={() => {
                  !account ? connect() : submitResponse();
                }}
                className="p-4 bg-blue-500 text-white"
                type="submit"
              >
                {!account ? "Connect Wallet" : "Submit Response"}
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
              Reponse Text: {r.text}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .index {
        }
      `}</style>
    </MainLayout>
  );
};

export default Index;
