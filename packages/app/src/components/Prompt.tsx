import dayjs from "dayjs";
import React from "react";
import { ENSName } from "react-ens-name";

const Prompt = ({ prompt }: { prompt: Prompt }) => {
  const promptExpired = dayjs().isAfter(dayjs.unix(prompt.endTime));

  return (
    <a href={`/prompt/${prompt.id}`}>
      <div className="prompt">
        <b>{prompt.text}</b>
        <br />
        <a href={`/author/${prompt.who?.id}`}>
          <ENSName address={prompt.who?.id} />
        </a>
        {" - "}
        {promptExpired ? (
          "Prompt Expired"
        ) : (
          <>
            {dayjs
              .unix(prompt.endTime)
              .diff(dayjs.unix(prompt.startTime), "hour")}
            {" Hours Remaining"}
          </>
        )}
      </div>
      <style jsx>{`
        .prompt {
          margin-bottom: 1rem;
          padding: 0.5rem;
          background: #fafafa;
        }
      `}</style>
    </a>
  );
};

export default Prompt;
