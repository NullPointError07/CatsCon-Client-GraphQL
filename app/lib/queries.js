import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    usersAll {
      _id
      userName
      email
    }
  }
`;
