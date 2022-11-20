import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  deleteService: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateName: Scalars['Boolean'];
  updateService: Scalars['Boolean'];
  updateServiceName: Scalars['Boolean'];
};


export type MutationCreateServiceArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationUpdateNameArgs = {
  name: Scalars['String'];
};


export type MutationUpdateServiceArgs = {
  description: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUpdateServiceNameArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllServices: Array<Service>;
  getService: Service;
  getUser: User;
  me?: Maybe<User>;
};


export type QueryGetServiceArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  services: Array<Service>;
  updatedAt: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularServiceFragment = { __typename: 'Service', id: number, name: string, description: string, creatorId: number, createdAt: string, updatedAt: string };

export type RegularUserFragment = { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string } | null };

export type RegularUserWithServiceFragment = { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string, services: Array<{ __typename: 'Service', id: number, name: string, description: string, creatorId: number, createdAt: string, updatedAt: string }> };

export type CreateServiceMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename: 'Service', id: number, name: string, description: string, creatorId: number, createdAt: string, updatedAt: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string } | null } };

export type UpdateServiceMutationVariables = Exact<{
  id: Scalars['Int'];
  description: Scalars['String'];
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: boolean };

export type UpdateServiceNameMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateServiceNameMutation = { __typename?: 'Mutation', updateServiceName: boolean };

export type GetAllServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServicesQuery = { __typename?: 'Query', getAllServices: Array<{ __typename: 'Service', id: number, name: string, description: string, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string } }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string, services: Array<{ __typename: 'Service', id: number, name: string, description: string, creatorId: number, createdAt: string, updatedAt: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: number, name: string, imgUrl: string, email: string, phone: string, createdAt: string, updatedAt: string, services: Array<{ __typename: 'Service', id: number, name: string, description: string, creatorId: number, createdAt: string, updatedAt: string }> } | null };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  name
  imgUrl
  email
  phone
  createdAt
  updatedAt
  __typename
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const RegularServiceFragmentDoc = gql`
    fragment RegularService on Service {
  id
  name
  description
  creatorId
  createdAt
  updatedAt
  __typename
}
    `;
export const RegularUserWithServiceFragmentDoc = gql`
    fragment RegularUserWithService on User {
  id
  name
  imgUrl
  email
  phone
  services {
    ...RegularService
  }
  createdAt
  updatedAt
  __typename
}
    ${RegularServiceFragmentDoc}`;
export const CreateServiceDocument = gql`
    mutation createService($name: String!, $description: String!) {
  createService(name: $name, description: $description) {
    ...RegularService
  }
}
    ${RegularServiceFragmentDoc}`;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation updateService($id: Int!, $description: String!) {
  updateService(id: $id, description: $description)
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const UpdateServiceNameDocument = gql`
    mutation updateServiceName($id: Int!, $name: String!) {
  updateServiceName(id: $id, name: $name)
}
    `;
export type UpdateServiceNameMutationFn = Apollo.MutationFunction<UpdateServiceNameMutation, UpdateServiceNameMutationVariables>;

/**
 * __useUpdateServiceNameMutation__
 *
 * To run a mutation, you first call `useUpdateServiceNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceNameMutation, { data, loading, error }] = useUpdateServiceNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateServiceNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceNameMutation, UpdateServiceNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceNameMutation, UpdateServiceNameMutationVariables>(UpdateServiceNameDocument, options);
      }
export type UpdateServiceNameMutationHookResult = ReturnType<typeof useUpdateServiceNameMutation>;
export type UpdateServiceNameMutationResult = Apollo.MutationResult<UpdateServiceNameMutation>;
export type UpdateServiceNameMutationOptions = Apollo.BaseMutationOptions<UpdateServiceNameMutation, UpdateServiceNameMutationVariables>;
export const GetAllServicesDocument = gql`
    query getAllServices {
  getAllServices {
    ...RegularService
    creator {
      ...RegularUser
    }
  }
}
    ${RegularServiceFragmentDoc}
${RegularUserFragmentDoc}`;

/**
 * __useGetAllServicesQuery__
 *
 * To run a query within a React component, call `useGetAllServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllServicesQuery, GetAllServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllServicesQuery, GetAllServicesQueryVariables>(GetAllServicesDocument, options);
      }
export function useGetAllServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllServicesQuery, GetAllServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllServicesQuery, GetAllServicesQueryVariables>(GetAllServicesDocument, options);
        }
export type GetAllServicesQueryHookResult = ReturnType<typeof useGetAllServicesQuery>;
export type GetAllServicesLazyQueryHookResult = ReturnType<typeof useGetAllServicesLazyQuery>;
export type GetAllServicesQueryResult = Apollo.QueryResult<GetAllServicesQuery, GetAllServicesQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: Int!) {
  getUser(id: $id) {
    ...RegularUserWithService
  }
}
    ${RegularUserWithServiceFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUserWithService
  }
}
    ${RegularUserWithServiceFragmentDoc}`;

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