import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { setContext } from "@apollo/client/link/context";

import ActionCable from "actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

const AuthorizedProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: `http://${process.env.REACT_APP_API_HOST}/graphql`,
  });
  const cable = ActionCable.createConsumer(
    `ws://${process.env.REACT_APP_API_HOST}/cable`
  );
  const link = ApolloLink.split(
    ({ query: { definitions } }) => {
      return definitions.some(
        ({ kind, operation }: any) =>
          kind === "OperationDefinition" && operation === "subscription"
      );
    },
    new ActionCableLink({ cable }),
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedProvider;
