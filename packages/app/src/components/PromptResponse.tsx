import React from "react";
import { ENSName } from "react-ens-name";

const PromptResponse = ({ response }: { response: PromptResponse }) => {
  return (
    <div className="promptresponse">
      Response Text: {response.text}
      <br />
      <a href={`/prompt/${response.prompt?.id}`}>
        Prompt Text: {response.prompt?.text}
      </a>
      <br />
      Who Prompted:{" "}
      <a href={`/author/${response.prompt?.who?.id}`}>
        <ENSName address={response.prompt?.who?.id} />
      </a>
      <style jsx>{`
        .promptresponse {
          margin-bottom: 1rem;
          padding: 0.5rem;
          background: #fafafa;
        }
      `}</style>
    </div>
  );
};

export default PromptResponse;
