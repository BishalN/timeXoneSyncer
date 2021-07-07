import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  setReminder?: Maybe<Scalars['Boolean']>;
  deleteReminder?: Maybe<Scalars['Boolean']>;
};


export type MutationSetReminderArgs = {
  date: Scalars['String'];
  userSetDate: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteReminderArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getMyReminders?: Maybe<Array<Reminder>>;
};

export type Reminder = {
  __typename?: 'Reminder';
  id: Scalars['String'];
  title: Scalars['String'];
  date: Scalars['String'];
  userSetDate: Scalars['String'];
  created_at: Scalars['DateTime'];
  user?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  profilePicture: Scalars['String'];
};

export type DeleteReminderMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteReminderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteReminder'>
);

export type SetReminderMutationVariables = Exact<{
  date: Scalars['String'];
  title: Scalars['String'];
  userSetDate: Scalars['String'];
}>;


export type SetReminderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setReminder'>
);

export type GetMyRemindersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyRemindersQuery = (
  { __typename?: 'Query' }
  & { getMyReminders?: Maybe<Array<(
    { __typename?: 'Reminder' }
    & Pick<Reminder, 'id' | 'title' | 'date' | 'userSetDate' | 'created_at'>
  )>> }
);

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'username' | 'profilePicture'>
  )> }
);


export const DeleteReminderDocument = gql`
    mutation deleteReminder($id: String!) {
  deleteReminder(id: $id)
}
    `;
export type DeleteReminderMutationFn = Apollo.MutationFunction<DeleteReminderMutation, DeleteReminderMutationVariables>;

/**
 * __useDeleteReminderMutation__
 *
 * To run a mutation, you first call `useDeleteReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReminderMutation, { data, loading, error }] = useDeleteReminderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReminderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReminderMutation, DeleteReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReminderMutation, DeleteReminderMutationVariables>(DeleteReminderDocument, options);
      }
export type DeleteReminderMutationHookResult = ReturnType<typeof useDeleteReminderMutation>;
export type DeleteReminderMutationResult = Apollo.MutationResult<DeleteReminderMutation>;
export type DeleteReminderMutationOptions = Apollo.BaseMutationOptions<DeleteReminderMutation, DeleteReminderMutationVariables>;
export const SetReminderDocument = gql`
    mutation setReminder($date: String!, $title: String!, $userSetDate: String!) {
  setReminder(date: $date, title: $title, userSetDate: $userSetDate)
}
    `;
export type SetReminderMutationFn = Apollo.MutationFunction<SetReminderMutation, SetReminderMutationVariables>;

/**
 * __useSetReminderMutation__
 *
 * To run a mutation, you first call `useSetReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setReminderMutation, { data, loading, error }] = useSetReminderMutation({
 *   variables: {
 *      date: // value for 'date'
 *      title: // value for 'title'
 *      userSetDate: // value for 'userSetDate'
 *   },
 * });
 */
export function useSetReminderMutation(baseOptions?: Apollo.MutationHookOptions<SetReminderMutation, SetReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetReminderMutation, SetReminderMutationVariables>(SetReminderDocument, options);
      }
export type SetReminderMutationHookResult = ReturnType<typeof useSetReminderMutation>;
export type SetReminderMutationResult = Apollo.MutationResult<SetReminderMutation>;
export type SetReminderMutationOptions = Apollo.BaseMutationOptions<SetReminderMutation, SetReminderMutationVariables>;
export const GetMyRemindersDocument = gql`
    query getMyReminders {
  getMyReminders {
    id
    title
    date
    userSetDate
    created_at
  }
}
    `;

/**
 * __useGetMyRemindersQuery__
 *
 * To run a query within a React component, call `useGetMyRemindersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyRemindersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyRemindersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyRemindersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyRemindersQuery, GetMyRemindersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyRemindersQuery, GetMyRemindersQueryVariables>(GetMyRemindersDocument, options);
      }
export function useGetMyRemindersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyRemindersQuery, GetMyRemindersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyRemindersQuery, GetMyRemindersQueryVariables>(GetMyRemindersDocument, options);
        }
export type GetMyRemindersQueryHookResult = ReturnType<typeof useGetMyRemindersQuery>;
export type GetMyRemindersLazyQueryHookResult = ReturnType<typeof useGetMyRemindersLazyQuery>;
export type GetMyRemindersQueryResult = Apollo.QueryResult<GetMyRemindersQuery, GetMyRemindersQueryVariables>;
export const HelloQueryDocument = gql`
    query helloQuery {
  hello
}
    `;

/**
 * __useHelloQueryQuery__
 *
 * To run a query within a React component, call `useHelloQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQueryQuery(baseOptions?: Apollo.QueryHookOptions<HelloQueryQuery, HelloQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQueryQuery, HelloQueryQueryVariables>(HelloQueryDocument, options);
      }
export function useHelloQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQueryQuery, HelloQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQueryQuery, HelloQueryQueryVariables>(HelloQueryDocument, options);
        }
export type HelloQueryQueryHookResult = ReturnType<typeof useHelloQueryQuery>;
export type HelloQueryLazyQueryHookResult = ReturnType<typeof useHelloQueryLazyQuery>;
export type HelloQueryQueryResult = Apollo.QueryResult<HelloQueryQuery, HelloQueryQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    username
    profilePicture
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const namedOperations = {
  Query: {
    getMyReminders: 'getMyReminders',
    helloQuery: 'helloQuery',
    Me: 'Me'
  },
  Mutation: {
    deleteReminder: 'deleteReminder',
    setReminder: 'setReminder'
  }
}