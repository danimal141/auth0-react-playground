import React from "react";
import { CurrentUserDocument } from "../../graphql/generated";
import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

const CurrentUser: React.FC = () => {
  const { data } = useQuery(CurrentUserDocument);
  const { user } = useAuth0();

  return (
    <>
      Current User!
      <p>data from GraphQL: {JSON.stringify(data)}</p>
      <p>data from Auth0: {JSON.stringify(user)}</p>
    </>
  );
};

export default CurrentUser;
