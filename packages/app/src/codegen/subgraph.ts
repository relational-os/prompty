import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  readonly number_gte: Scalars['Int'];
};

export type Block_Height = {
  readonly hash?: InputMaybe<Scalars['Bytes']>;
  readonly number?: InputMaybe<Scalars['Int']>;
  readonly number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Prompt = {
  readonly __typename?: 'Prompt';
  readonly endTime: Scalars['BigInt'];
  readonly id: Scalars['ID'];
  readonly instance: PromptyInstance;
  readonly maxChars: Scalars['Int'];
  readonly minChars: Scalars['Int'];
  readonly responseCount: Scalars['Int'];
  readonly responses: ReadonlyArray<Response>;
  readonly startTime: Scalars['BigInt'];
  readonly text: Scalars['String'];
  readonly who: Wallet;
};


export type PromptResponsesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Response_Filter>;
};

export type Prompt_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly endTime?: InputMaybe<Scalars['BigInt']>;
  readonly endTime_gt?: InputMaybe<Scalars['BigInt']>;
  readonly endTime_gte?: InputMaybe<Scalars['BigInt']>;
  readonly endTime_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly endTime_lt?: InputMaybe<Scalars['BigInt']>;
  readonly endTime_lte?: InputMaybe<Scalars['BigInt']>;
  readonly endTime_not?: InputMaybe<Scalars['BigInt']>;
  readonly endTime_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly instance?: InputMaybe<Scalars['String']>;
  readonly instance_?: InputMaybe<PromptyInstance_Filter>;
  readonly instance_contains?: InputMaybe<Scalars['String']>;
  readonly instance_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly instance_ends_with?: InputMaybe<Scalars['String']>;
  readonly instance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly instance_gt?: InputMaybe<Scalars['String']>;
  readonly instance_gte?: InputMaybe<Scalars['String']>;
  readonly instance_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly instance_lt?: InputMaybe<Scalars['String']>;
  readonly instance_lte?: InputMaybe<Scalars['String']>;
  readonly instance_not?: InputMaybe<Scalars['String']>;
  readonly instance_not_contains?: InputMaybe<Scalars['String']>;
  readonly instance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly instance_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly instance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly instance_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly instance_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly instance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly instance_starts_with?: InputMaybe<Scalars['String']>;
  readonly instance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly maxChars?: InputMaybe<Scalars['Int']>;
  readonly maxChars_gt?: InputMaybe<Scalars['Int']>;
  readonly maxChars_gte?: InputMaybe<Scalars['Int']>;
  readonly maxChars_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly maxChars_lt?: InputMaybe<Scalars['Int']>;
  readonly maxChars_lte?: InputMaybe<Scalars['Int']>;
  readonly maxChars_not?: InputMaybe<Scalars['Int']>;
  readonly maxChars_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly minChars?: InputMaybe<Scalars['Int']>;
  readonly minChars_gt?: InputMaybe<Scalars['Int']>;
  readonly minChars_gte?: InputMaybe<Scalars['Int']>;
  readonly minChars_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly minChars_lt?: InputMaybe<Scalars['Int']>;
  readonly minChars_lte?: InputMaybe<Scalars['Int']>;
  readonly minChars_not?: InputMaybe<Scalars['Int']>;
  readonly minChars_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly responseCount?: InputMaybe<Scalars['Int']>;
  readonly responseCount_gt?: InputMaybe<Scalars['Int']>;
  readonly responseCount_gte?: InputMaybe<Scalars['Int']>;
  readonly responseCount_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly responseCount_lt?: InputMaybe<Scalars['Int']>;
  readonly responseCount_lte?: InputMaybe<Scalars['Int']>;
  readonly responseCount_not?: InputMaybe<Scalars['Int']>;
  readonly responseCount_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly responses_?: InputMaybe<Response_Filter>;
  readonly startTime?: InputMaybe<Scalars['BigInt']>;
  readonly startTime_gt?: InputMaybe<Scalars['BigInt']>;
  readonly startTime_gte?: InputMaybe<Scalars['BigInt']>;
  readonly startTime_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly startTime_lt?: InputMaybe<Scalars['BigInt']>;
  readonly startTime_lte?: InputMaybe<Scalars['BigInt']>;
  readonly startTime_not?: InputMaybe<Scalars['BigInt']>;
  readonly startTime_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly text?: InputMaybe<Scalars['String']>;
  readonly text_contains?: InputMaybe<Scalars['String']>;
  readonly text_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly text_ends_with?: InputMaybe<Scalars['String']>;
  readonly text_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text_gt?: InputMaybe<Scalars['String']>;
  readonly text_gte?: InputMaybe<Scalars['String']>;
  readonly text_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly text_lt?: InputMaybe<Scalars['String']>;
  readonly text_lte?: InputMaybe<Scalars['String']>;
  readonly text_not?: InputMaybe<Scalars['String']>;
  readonly text_not_contains?: InputMaybe<Scalars['String']>;
  readonly text_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly text_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly text_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly text_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly text_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text_starts_with?: InputMaybe<Scalars['String']>;
  readonly text_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who?: InputMaybe<Scalars['String']>;
  readonly who_?: InputMaybe<Wallet_Filter>;
  readonly who_contains?: InputMaybe<Scalars['String']>;
  readonly who_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly who_ends_with?: InputMaybe<Scalars['String']>;
  readonly who_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who_gt?: InputMaybe<Scalars['String']>;
  readonly who_gte?: InputMaybe<Scalars['String']>;
  readonly who_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly who_lt?: InputMaybe<Scalars['String']>;
  readonly who_lte?: InputMaybe<Scalars['String']>;
  readonly who_not?: InputMaybe<Scalars['String']>;
  readonly who_not_contains?: InputMaybe<Scalars['String']>;
  readonly who_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly who_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly who_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly who_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly who_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who_starts_with?: InputMaybe<Scalars['String']>;
  readonly who_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Prompt_OrderBy {
  EndTime = 'endTime',
  Id = 'id',
  Instance = 'instance',
  MaxChars = 'maxChars',
  MinChars = 'minChars',
  ResponseCount = 'responseCount',
  Responses = 'responses',
  StartTime = 'startTime',
  Text = 'text',
  Who = 'who'
}

export type PromptyInstance = {
  readonly __typename?: 'PromptyInstance';
  readonly allowedResponders?: Maybe<ReadonlyArray<Wallet>>;
  readonly description: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly prompts: ReadonlyArray<Prompt>;
};


export type PromptyInstanceAllowedRespondersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wallet_Filter>;
};


export type PromptyInstancePromptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Prompt_Filter>;
};

export type PromptyInstance_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly allowedResponders?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly allowedResponders_?: InputMaybe<Wallet_Filter>;
  readonly allowedResponders_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly allowedResponders_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly allowedResponders_not?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly allowedResponders_not_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly allowedResponders_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly description_contains?: InputMaybe<Scalars['String']>;
  readonly description_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly description_ends_with?: InputMaybe<Scalars['String']>;
  readonly description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly description_gt?: InputMaybe<Scalars['String']>;
  readonly description_gte?: InputMaybe<Scalars['String']>;
  readonly description_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly description_lt?: InputMaybe<Scalars['String']>;
  readonly description_lte?: InputMaybe<Scalars['String']>;
  readonly description_not?: InputMaybe<Scalars['String']>;
  readonly description_not_contains?: InputMaybe<Scalars['String']>;
  readonly description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly description_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly description_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly description_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly description_starts_with?: InputMaybe<Scalars['String']>;
  readonly description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly name_contains?: InputMaybe<Scalars['String']>;
  readonly name_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_gt?: InputMaybe<Scalars['String']>;
  readonly name_gte?: InputMaybe<Scalars['String']>;
  readonly name_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_lt?: InputMaybe<Scalars['String']>;
  readonly name_lte?: InputMaybe<Scalars['String']>;
  readonly name_not?: InputMaybe<Scalars['String']>;
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  readonly name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly prompts_?: InputMaybe<Prompt_Filter>;
};

export enum PromptyInstance_OrderBy {
  AllowedResponders = 'allowedResponders',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  Prompts = 'prompts'
}

export type Query = {
  readonly __typename?: 'Query';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly prompt?: Maybe<Prompt>;
  readonly prompts: ReadonlyArray<Prompt>;
  readonly promptyInstance?: Maybe<PromptyInstance>;
  readonly promptyInstances: ReadonlyArray<PromptyInstance>;
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
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPromptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Prompt_Filter>;
};


export type QueryPromptyInstanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPromptyInstancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PromptyInstance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PromptyInstance_Filter>;
};


export type QueryResponseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryResponsesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Response_Filter>;
};


export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Response = {
  readonly __typename?: 'Response';
  readonly created: Scalars['BigInt'];
  readonly id: Scalars['ID'];
  readonly prompt: Prompt;
  readonly text: Scalars['String'];
  readonly who: Wallet;
};

export type Response_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly created?: InputMaybe<Scalars['BigInt']>;
  readonly created_gt?: InputMaybe<Scalars['BigInt']>;
  readonly created_gte?: InputMaybe<Scalars['BigInt']>;
  readonly created_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly created_lt?: InputMaybe<Scalars['BigInt']>;
  readonly created_lte?: InputMaybe<Scalars['BigInt']>;
  readonly created_not?: InputMaybe<Scalars['BigInt']>;
  readonly created_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly prompt?: InputMaybe<Scalars['String']>;
  readonly prompt_?: InputMaybe<Prompt_Filter>;
  readonly prompt_contains?: InputMaybe<Scalars['String']>;
  readonly prompt_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly prompt_ends_with?: InputMaybe<Scalars['String']>;
  readonly prompt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly prompt_gt?: InputMaybe<Scalars['String']>;
  readonly prompt_gte?: InputMaybe<Scalars['String']>;
  readonly prompt_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly prompt_lt?: InputMaybe<Scalars['String']>;
  readonly prompt_lte?: InputMaybe<Scalars['String']>;
  readonly prompt_not?: InputMaybe<Scalars['String']>;
  readonly prompt_not_contains?: InputMaybe<Scalars['String']>;
  readonly prompt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly prompt_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly prompt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly prompt_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly prompt_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly prompt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly prompt_starts_with?: InputMaybe<Scalars['String']>;
  readonly prompt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text?: InputMaybe<Scalars['String']>;
  readonly text_contains?: InputMaybe<Scalars['String']>;
  readonly text_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly text_ends_with?: InputMaybe<Scalars['String']>;
  readonly text_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text_gt?: InputMaybe<Scalars['String']>;
  readonly text_gte?: InputMaybe<Scalars['String']>;
  readonly text_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly text_lt?: InputMaybe<Scalars['String']>;
  readonly text_lte?: InputMaybe<Scalars['String']>;
  readonly text_not?: InputMaybe<Scalars['String']>;
  readonly text_not_contains?: InputMaybe<Scalars['String']>;
  readonly text_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly text_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly text_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly text_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly text_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly text_starts_with?: InputMaybe<Scalars['String']>;
  readonly text_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who?: InputMaybe<Scalars['String']>;
  readonly who_?: InputMaybe<Wallet_Filter>;
  readonly who_contains?: InputMaybe<Scalars['String']>;
  readonly who_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly who_ends_with?: InputMaybe<Scalars['String']>;
  readonly who_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who_gt?: InputMaybe<Scalars['String']>;
  readonly who_gte?: InputMaybe<Scalars['String']>;
  readonly who_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly who_lt?: InputMaybe<Scalars['String']>;
  readonly who_lte?: InputMaybe<Scalars['String']>;
  readonly who_not?: InputMaybe<Scalars['String']>;
  readonly who_not_contains?: InputMaybe<Scalars['String']>;
  readonly who_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly who_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly who_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly who_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly who_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly who_starts_with?: InputMaybe<Scalars['String']>;
  readonly who_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Response_OrderBy {
  Created = 'created',
  Id = 'id',
  Prompt = 'prompt',
  Text = 'text',
  Who = 'who'
}

export type Subscription = {
  readonly __typename?: 'Subscription';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly prompt?: Maybe<Prompt>;
  readonly prompts: ReadonlyArray<Prompt>;
  readonly promptyInstance?: Maybe<PromptyInstance>;
  readonly promptyInstances: ReadonlyArray<PromptyInstance>;
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
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPromptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Prompt_Filter>;
};


export type SubscriptionPromptyInstanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPromptyInstancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PromptyInstance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PromptyInstance_Filter>;
};


export type SubscriptionResponseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionResponsesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Response_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Wallet = {
  readonly __typename?: 'Wallet';
  readonly id: Scalars['ID'];
  readonly prompts: ReadonlyArray<Prompt>;
  readonly responses: ReadonlyArray<Response>;
};


export type WalletPromptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Prompt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Prompt_Filter>;
};


export type WalletResponsesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Response_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Response_Filter>;
};

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly prompts_?: InputMaybe<Prompt_Filter>;
  readonly responses_?: InputMaybe<Response_Filter>;
};

export enum Wallet_OrderBy {
  Id = 'id',
  Prompts = 'prompts',
  Responses = 'responses'
}

export type _Block_ = {
  readonly __typename?: '_Block_';
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  readonly __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AuthorQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AuthorQuery = { readonly __typename?: 'Query', readonly wallet?: { readonly __typename?: 'Wallet', readonly id: string, readonly prompts: ReadonlyArray<{ readonly __typename?: 'Prompt', readonly id: string, readonly text: string, readonly startTime: any, readonly endTime: any, readonly minChars: number, readonly maxChars: number, readonly responseCount: number, readonly instance: { readonly __typename?: 'PromptyInstance', readonly id: string }, readonly who: { readonly __typename?: 'Wallet', readonly id: string } }>, readonly responses: ReadonlyArray<{ readonly __typename?: 'Response', readonly id: string, readonly text: string, readonly created: any, readonly prompt: { readonly __typename?: 'Prompt', readonly id: string, readonly text: string, readonly who: { readonly __typename?: 'Wallet', readonly id: string }, readonly instance: { readonly __typename?: 'PromptyInstance', readonly id: string } } }> } | null };

export type LatestPromptsFromGroupQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LatestPromptsFromGroupQuery = { readonly __typename?: 'Query', readonly promptyInstances: ReadonlyArray<{ readonly __typename?: 'PromptyInstance', readonly id: string, readonly name: string, readonly prompts: ReadonlyArray<{ readonly __typename?: 'Prompt', readonly id: string, readonly text: string, readonly startTime: any, readonly endTime: any, readonly minChars: number, readonly maxChars: number, readonly responseCount: number, readonly who: { readonly __typename?: 'Wallet', readonly id: string }, readonly instance: { readonly __typename?: 'PromptyInstance', readonly id: string } }> }> };

export type PromptIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PromptIdQuery = { readonly __typename?: 'Query', readonly prompt?: { readonly __typename?: 'Prompt', readonly id: string, readonly text: string, readonly startTime: any, readonly endTime: any, readonly minChars: number, readonly maxChars: number, readonly responseCount: number, readonly who: { readonly __typename?: 'Wallet', readonly id: string }, readonly responses: ReadonlyArray<{ readonly __typename?: 'Response', readonly id: string, readonly text: string, readonly who: { readonly __typename?: 'Wallet', readonly id: string } }> } | null };

export type PromptyInstanceByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PromptyInstanceByIdQuery = { readonly __typename?: 'Query', readonly promptyInstances: ReadonlyArray<{ readonly __typename?: 'PromptyInstance', readonly id: string, readonly name: string, readonly allowedResponders?: ReadonlyArray<{ readonly __typename?: 'Wallet', readonly id: string }> | null }> };

export type PublicPromptyInstancesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicPromptyInstancesQuery = { readonly __typename?: 'Query', readonly promptyInstances: ReadonlyArray<{ readonly __typename?: 'PromptyInstance', readonly id: string, readonly name: string, readonly description: string, readonly allowedResponders?: ReadonlyArray<{ readonly __typename?: 'Wallet', readonly id: string }> | null }> };


export const AuthorDocument = gql`
    query Author($id: ID!) {
  wallet(id: $id) {
    id
    prompts {
      id
      text
      startTime
      endTime
      instance {
        id
      }
      minChars
      maxChars
      who {
        id
      }
      responseCount
    }
    responses {
      id
      text
      created
      prompt {
        id
        text
        who {
          id
        }
        instance {
          id
        }
      }
    }
  }
}
    `;

export function useAuthorQuery(options: Omit<Urql.UseQueryArgs<AuthorQueryVariables>, 'query'>) {
  return Urql.useQuery<AuthorQuery>({ query: AuthorDocument, ...options });
};
export const LatestPromptsFromGroupDocument = gql`
    query LatestPromptsFromGroup($id: ID!) {
  promptyInstances(where: {id: $id}) {
    id
    name
    prompts(first: 10, orderBy: startTime, orderDirection: desc) {
      id
      who {
        id
      }
      text
      startTime
      endTime
      minChars
      maxChars
      responseCount
      instance {
        id
      }
    }
  }
}
    `;

export function useLatestPromptsFromGroupQuery(options: Omit<Urql.UseQueryArgs<LatestPromptsFromGroupQueryVariables>, 'query'>) {
  return Urql.useQuery<LatestPromptsFromGroupQuery>({ query: LatestPromptsFromGroupDocument, ...options });
};
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
    minChars
    maxChars
    responses {
      id
      who {
        id
      }
      text
    }
    responseCount
  }
}
    `;

export function usePromptIdQuery(options: Omit<Urql.UseQueryArgs<PromptIdQueryVariables>, 'query'>) {
  return Urql.useQuery<PromptIdQuery>({ query: PromptIdDocument, ...options });
};
export const PromptyInstanceByIdDocument = gql`
    query PromptyInstanceById($id: ID!) {
  promptyInstances(where: {id: $id}) {
    id
    name
    allowedResponders {
      id
    }
  }
}
    `;

export function usePromptyInstanceByIdQuery(options: Omit<Urql.UseQueryArgs<PromptyInstanceByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<PromptyInstanceByIdQuery>({ query: PromptyInstanceByIdDocument, ...options });
};
export const PublicPromptyInstancesDocument = gql`
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

export function usePublicPromptyInstancesQuery(options?: Omit<Urql.UseQueryArgs<PublicPromptyInstancesQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicPromptyInstancesQuery>({ query: PublicPromptyInstancesDocument, ...options });
};