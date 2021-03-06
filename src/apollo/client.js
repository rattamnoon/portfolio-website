import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import mainUrl from '../config/mainUrl';

const httpLink = new HttpLink({
  uri: `${mainUrl}/graphql`,
});
const authLink = setContext(async (request, previousContext) => {
  const { headers } = previousContext;
  // const { AuthReducer } = storeConfig.store.getState();
  // const { token } = AuthReducer;

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.REACT_APP_API_AUTH_TOKEN}`,
      'x-token': 'un',
      'x-refreshToken': 'un',
    },
  };
});

const linkErr = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const notAuth = graphQLErrors.reduce((pre, cur) => {
        if (
          cur.message === 'Not authenticated' ||
          cur.message === 'Not Authorised!' ||
          cur.message ===
            'Access denied! You need to be authorized to perform this action!' ||
          cur.message.includes('Not authenticated')
        ) {
          return true;
        }

        return pre;
      }, false);

      console.log('notAuth', notAuth);

      graphQLErrors.forEach(({ extensions, message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);

export default new ApolloClient({
  link: from([linkErr, authLink, httpLink]),
  cache: new InMemoryCache(),
});
