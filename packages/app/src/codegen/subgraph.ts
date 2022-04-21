import { gql } from "urql";
import * as Urql from "urql";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  readonly number_gte: Scalars["Int"];
};

export type Block_Height = {
  readonly hash?: InputMaybe<Scalars["Bytes"]>;
  readonly number?: InputMaybe<Scalars["Int"]>;
  readonly number_gte?: InputMaybe<Scalars["Int"]>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Prompt = {
  readonly __typename?: "Prompt";
  readonly endTime: Scalars["BigInt"];
  readonly id: Scalars["ID"];
  readonly maxChars: Scalars["Int"];
  readonly minChars: Scalars["Int"];
  readonly responses: ReadonlyArray<Response>;
  readonly startTime: Scalars["BigInt"];
  readonly text: Scalars["String"];
  readonly who: Wallet;
};

export type PromptResponsesArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Response_Filter>;
};

export type Prompt_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly endTime?: InputMaybe<Scalars["BigInt"]>;
  readonly endTime_gt?: InputMaybe<Scalars["BigInt"]>;
  readonly endTime_gte?: InputMaybe<Scalars["BigInt"]>;
  readonly endTime_in?: InputMaybe<ReadonlyArray<Scalars["BigInt"]>>;
  readonly endTime_lt?: InputMaybe<Scalars["BigInt"]>;
  readonly endTime_lte?: InputMaybe<Scalars["BigInt"]>;
  readonly endTime_not?: InputMaybe<Scalars["BigInt"]>;
  readonly endTime_not_in?: InputMaybe<ReadonlyArray<Scalars["BigInt"]>>;
  readonly id?: InputMaybe<Scalars["ID"]>;
  readonly id_gt?: InputMaybe<Scalars["ID"]>;
  readonly id_gte?: InputMaybe<Scalars["ID"]>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: InputMaybe<Scalars["ID"]>;
  readonly id_lte?: InputMaybe<Scalars["ID"]>;
  readonly id_not?: InputMaybe<Scalars["ID"]>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly maxChars?: InputMaybe<Scalars["Int"]>;
  readonly maxChars_gt?: InputMaybe<Scalars["Int"]>;
  readonly maxChars_gte?: InputMaybe<Scalars["Int"]>;
  readonly maxChars_in?: InputMaybe<ReadonlyArray<Scalars["Int"]>>;
  readonly maxChars_lt?: InputMaybe<Scalars["Int"]>;
  readonly maxChars_lte?: InputMaybe<Scalars["Int"]>;
  readonly maxChars_not?: InputMaybe<Scalars["Int"]>;
  readonly maxChars_not_in?: InputMaybe<ReadonlyArray<Scalars["Int"]>>;
  readonly minChars?: InputMaybe<Scalars["Int"]>;
  readonly minChars_gt?: InputMaybe<Scalars["Int"]>;
  readonly minChars_gte?: InputMaybe<Scalars["Int"]>;
  readonly minChars_in?: InputMaybe<ReadonlyArray<Scalars["Int"]>>;
  readonly minChars_lt?: InputMaybe<Scalars["Int"]>;
  readonly minChars_lte?: InputMaybe<Scalars["Int"]>;
  readonly minChars_not?: InputMaybe<Scalars["Int"]>;
  readonly minChars_not_in?: InputMaybe<ReadonlyArray<Scalars["Int"]>>;
  readonly startTime?: InputMaybe<Scalars["BigInt"]>;
  readonly startTime_gt?: InputMaybe<Scalars["BigInt"]>;
  readonly startTime_gte?: InputMaybe<Scalars["BigInt"]>;
  readonly startTime_in?: InputMaybe<ReadonlyArray<Scalars["BigInt"]>>;
  readonly startTime_lt?: InputMaybe<Scalars["BigInt"]>;
  readonly startTime_lte?: InputMaybe<Scalars["BigInt"]>;
  readonly startTime_not?: InputMaybe<Scalars["BigInt"]>;
  readonly startTime_not_in?: InputMaybe<ReadonlyArray<Scalars["BigInt"]>>;
  readonly text?: InputMaybe<Scalars["String"]>;
  readonly text_contains?: InputMaybe<Scalars["String"]>;
  readonly text_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_ends_with?: InputMaybe<Scalars["String"]>;
  readonly text_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_gt?: InputMaybe<Scalars["String"]>;
  readonly text_gte?: InputMaybe<Scalars["String"]>;
  readonly text_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly text_lt?: InputMaybe<Scalars["String"]>;
  readonly text_lte?: InputMaybe<Scalars["String"]>;
  readonly text_not?: InputMaybe<Scalars["String"]>;
  readonly text_not_contains?: InputMaybe<Scalars["String"]>;
  readonly text_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_not_ends_with?: InputMaybe<Scalars["String"]>;
  readonly text_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_not_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly text_not_starts_with?: InputMaybe<Scalars["String"]>;
  readonly text_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_starts_with?: InputMaybe<Scalars["String"]>;
  readonly text_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who?: InputMaybe<Scalars["String"]>;
  readonly who_contains?: InputMaybe<Scalars["String"]>;
  readonly who_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_ends_with?: InputMaybe<Scalars["String"]>;
  readonly who_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_gt?: InputMaybe<Scalars["String"]>;
  readonly who_gte?: InputMaybe<Scalars["String"]>;
  readonly who_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly who_lt?: InputMaybe<Scalars["String"]>;
  readonly who_lte?: InputMaybe<Scalars["String"]>;
  readonly who_not?: InputMaybe<Scalars["String"]>;
  readonly who_not_contains?: InputMaybe<Scalars["String"]>;
  readonly who_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_not_ends_with?: InputMaybe<Scalars["String"]>;
  readonly who_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_not_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly who_not_starts_with?: InputMaybe<Scalars["String"]>;
  readonly who_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_starts_with?: InputMaybe<Scalars["String"]>;
  readonly who_starts_with_nocase?: InputMaybe<Scalars["String"]>;
};

export enum Prompt_OrderBy {
  EndTime = "endTime",
  Id = "id",
  MaxChars = "maxChars",
  MinChars = "minChars",
  Responses = "responses",
  StartTime = "startTime",
  Text = "text",
  Who = "who",
}

export type Query = {
  readonly __typename?: "Query";
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly prompt?: Maybe<Prompt>;
  readonly prompts: ReadonlyArray<Prompt>;
  readonly response?: Maybe<Response>;
  readonly responses: ReadonlyArray<Response>;
  readonly wallet?: Maybe<Wallet>;
  readonly wallets: ReadonlyArray<Wallet>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryPromptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPromptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Prompt_Filter>;
};

export type QueryResponseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryResponsesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Response_Filter>;
};

export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Response = {
  readonly __typename?: "Response";
  readonly created: Scalars["BigInt"];
  readonly id: Scalars["ID"];
  readonly prompt: Prompt;
  readonly text: Scalars["String"];
  readonly who: Wallet;
};

export type Response_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly created?: InputMaybe<Scalars["BigInt"]>;
  readonly created_gt?: InputMaybe<Scalars["BigInt"]>;
  readonly created_gte?: InputMaybe<Scalars["BigInt"]>;
  readonly created_in?: InputMaybe<ReadonlyArray<Scalars["BigInt"]>>;
  readonly created_lt?: InputMaybe<Scalars["BigInt"]>;
  readonly created_lte?: InputMaybe<Scalars["BigInt"]>;
  readonly created_not?: InputMaybe<Scalars["BigInt"]>;
  readonly created_not_in?: InputMaybe<ReadonlyArray<Scalars["BigInt"]>>;
  readonly id?: InputMaybe<Scalars["ID"]>;
  readonly id_gt?: InputMaybe<Scalars["ID"]>;
  readonly id_gte?: InputMaybe<Scalars["ID"]>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: InputMaybe<Scalars["ID"]>;
  readonly id_lte?: InputMaybe<Scalars["ID"]>;
  readonly id_not?: InputMaybe<Scalars["ID"]>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly prompt?: InputMaybe<Scalars["String"]>;
  readonly prompt_contains?: InputMaybe<Scalars["String"]>;
  readonly prompt_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly prompt_ends_with?: InputMaybe<Scalars["String"]>;
  readonly prompt_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly prompt_gt?: InputMaybe<Scalars["String"]>;
  readonly prompt_gte?: InputMaybe<Scalars["String"]>;
  readonly prompt_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly prompt_lt?: InputMaybe<Scalars["String"]>;
  readonly prompt_lte?: InputMaybe<Scalars["String"]>;
  readonly prompt_not?: InputMaybe<Scalars["String"]>;
  readonly prompt_not_contains?: InputMaybe<Scalars["String"]>;
  readonly prompt_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly prompt_not_ends_with?: InputMaybe<Scalars["String"]>;
  readonly prompt_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly prompt_not_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly prompt_not_starts_with?: InputMaybe<Scalars["String"]>;
  readonly prompt_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly prompt_starts_with?: InputMaybe<Scalars["String"]>;
  readonly prompt_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text?: InputMaybe<Scalars["String"]>;
  readonly text_contains?: InputMaybe<Scalars["String"]>;
  readonly text_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_ends_with?: InputMaybe<Scalars["String"]>;
  readonly text_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_gt?: InputMaybe<Scalars["String"]>;
  readonly text_gte?: InputMaybe<Scalars["String"]>;
  readonly text_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly text_lt?: InputMaybe<Scalars["String"]>;
  readonly text_lte?: InputMaybe<Scalars["String"]>;
  readonly text_not?: InputMaybe<Scalars["String"]>;
  readonly text_not_contains?: InputMaybe<Scalars["String"]>;
  readonly text_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_not_ends_with?: InputMaybe<Scalars["String"]>;
  readonly text_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_not_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly text_not_starts_with?: InputMaybe<Scalars["String"]>;
  readonly text_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly text_starts_with?: InputMaybe<Scalars["String"]>;
  readonly text_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who?: InputMaybe<Scalars["String"]>;
  readonly who_contains?: InputMaybe<Scalars["String"]>;
  readonly who_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_ends_with?: InputMaybe<Scalars["String"]>;
  readonly who_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_gt?: InputMaybe<Scalars["String"]>;
  readonly who_gte?: InputMaybe<Scalars["String"]>;
  readonly who_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly who_lt?: InputMaybe<Scalars["String"]>;
  readonly who_lte?: InputMaybe<Scalars["String"]>;
  readonly who_not?: InputMaybe<Scalars["String"]>;
  readonly who_not_contains?: InputMaybe<Scalars["String"]>;
  readonly who_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_not_ends_with?: InputMaybe<Scalars["String"]>;
  readonly who_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_not_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly who_not_starts_with?: InputMaybe<Scalars["String"]>;
  readonly who_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  readonly who_starts_with?: InputMaybe<Scalars["String"]>;
  readonly who_starts_with_nocase?: InputMaybe<Scalars["String"]>;
};

export enum Response_OrderBy {
  Created = "created",
  Id = "id",
  Prompt = "prompt",
  Text = "text",
  Who = "who",
}

export type Subscription = {
  readonly __typename?: "Subscription";
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly prompt?: Maybe<Prompt>;
  readonly prompts: ReadonlyArray<Prompt>;
  readonly response?: Maybe<Response>;
  readonly responses: ReadonlyArray<Response>;
  readonly wallet?: Maybe<Wallet>;
  readonly wallets: ReadonlyArray<Wallet>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionPromptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPromptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Prompt_Filter>;
};

export type SubscriptionResponseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionResponsesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Response_Filter>;
};

export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Wallet = {
  readonly __typename?: "Wallet";
  readonly id: Scalars["ID"];
  readonly prompts: ReadonlyArray<Prompt>;
  readonly responses: ReadonlyArray<Response>;
};

export type WalletPromptsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Prompt_Filter>;
};

export type WalletResponsesArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Response_Filter>;
};

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly id?: InputMaybe<Scalars["ID"]>;
  readonly id_gt?: InputMaybe<Scalars["ID"]>;
  readonly id_gte?: InputMaybe<Scalars["ID"]>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: InputMaybe<Scalars["ID"]>;
  readonly id_lte?: InputMaybe<Scalars["ID"]>;
  readonly id_not?: InputMaybe<Scalars["ID"]>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
};

export enum Wallet_OrderBy {
  Id = "id",
  Prompts = "prompts",
  Responses = "responses",
}

export type _Block_ = {
  readonly __typename?: "_Block_";
  /** The hash of the block */
  readonly hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  readonly number: Scalars["Int"];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  readonly __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type AuthorQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AuthorQuery = {
  readonly __typename?: "Query";
  readonly wallet?:
    | {
        readonly __typename?: "Wallet";
        readonly id: string;
        readonly prompts: ReadonlyArray<{
          readonly __typename?: "Prompt";
          readonly id: string;
          readonly text: string;
          readonly startTime: any;
          readonly endTime: any;
        }>;
        readonly responses: ReadonlyArray<{
          readonly __typename?: "Response";
          readonly id: string;
          readonly text: string;
          readonly prompt: {
            readonly __typename?: "Prompt";
            readonly id: string;
            readonly text: string;
          };
        }>;
      }
    | null
    | undefined;
};

export type PromptIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PromptIdQuery = {
  readonly __typename?: "Query";
  readonly prompt?:
    | {
        readonly __typename?: "Prompt";
        readonly id: string;
        readonly text: string;
        readonly startTime: any;
        readonly endTime: any;
        readonly who: { readonly __typename?: "Wallet"; readonly id: string };
        readonly responses: ReadonlyArray<{
          readonly __typename?: "Response";
          readonly id: string;
          readonly text: string;
          readonly who: { readonly __typename?: "Wallet"; readonly id: string };
        }>;
      }
    | null
    | undefined;
};

export const AuthorDocument = gql`
  query Author($id: ID!) {
    wallet(id: $id) {
      id
      prompts {
        id
        text
        startTime
        endTime
      }
      responses {
        id
        text
        prompt {
          id
          text
        }
      }
    }
  }
`;

export function useAuthorQuery(
  options: Omit<Urql.UseQueryArgs<AuthorQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<AuthorQuery>({ query: AuthorDocument, ...options });
}
export const PromptIdDocument = gql`
  query PromptID($id: ID!) {
    prompt(id: $id) {
      id
      who {
        id
      }
      text
      startTime
      endTime
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

export function usePromptIdQuery(
  options: Omit<Urql.UseQueryArgs<PromptIdQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<PromptIdQuery>({ query: PromptIdDocument, ...options });
}
