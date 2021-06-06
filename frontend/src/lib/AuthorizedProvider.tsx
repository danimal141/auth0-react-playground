import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { setContext } from "@apollo/client/link/context";

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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedProvider;
