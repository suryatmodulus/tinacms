// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};



export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: Maybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
  form: Scalars['JSON'];
  values: Scalars['JSON'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getCollection: Collection;
  getCollections: Array<Collection>;
  node: Node;
  getDocument: DocumentNode;
  getDocumentList: DocumentConnection;
  getDocumentFields: Scalars['JSON'];
  getPageDocument: PageDocument;
  getPageList: PageConnection;
  getPostDocument: PostDocument;
  getPostList: PostConnection;
};


export type QueryGetCollectionArgs = {
  collection?: Maybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetPageDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetPageListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetPostDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetPostListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label: Scalars['String'];
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DocumentNode = PageDocument | PostDocument;

export type Page = {
  __typename?: 'Page';
  body?: Maybe<Scalars['JSON']>;
};

export type PageDocument = Node & Document & {
  __typename?: 'PageDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Page;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PageConnectionEdges = {
  __typename?: 'PageConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PageDocument>;
};

export type PageConnection = Connection & {
  __typename?: 'PageConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<PageConnectionEdges>>>;
};

export type Post = {
  __typename?: 'Post';
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type PostDocument = Node & Document & {
  __typename?: 'PostDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Post;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PostConnectionEdges = {
  __typename?: 'PostConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PostDocument>;
};

export type PostConnection = Connection & {
  __typename?: 'PostConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<PostConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  createDocument: DocumentNode;
  updatePageDocument: PageDocument;
  createPageDocument: PageDocument;
  updatePostDocument: PostDocument;
  createPostDocument: PostDocument;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: Maybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationCreateDocumentArgs = {
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdatePageDocumentArgs = {
  relativePath: Scalars['String'];
  params: PageMutation;
};


export type MutationCreatePageDocumentArgs = {
  relativePath: Scalars['String'];
  params: PageMutation;
};


export type MutationUpdatePostDocumentArgs = {
  relativePath: Scalars['String'];
  params: PostMutation;
};


export type MutationCreatePostDocumentArgs = {
  relativePath: Scalars['String'];
  params: PostMutation;
};

export type DocumentMutation = {
  page?: Maybe<PageMutation>;
  post?: Maybe<PostMutation>;
};

export type PageMutation = {
  body?: Maybe<Scalars['JSON']>;
};

export type PostMutation = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

