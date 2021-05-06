import React from "react";
import { CurrentUserDocument } from "../../graphql/generated";
import { useQuery } from "@apollo/client";

const CurrentUser: React.FC = () => {
  const { data } = useQuery(CurrentUserDocument);
  return (
    <>
      Current User!
      <p>data: {JSON.stringify(data)}</p>
    </>
  );
};

export default CurrentUser;
