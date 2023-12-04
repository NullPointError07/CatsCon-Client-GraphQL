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

export const GET_USER_BY_EMAIL = gql`
  query UserByEmail($userEmail: String!) {
    userByEmail(userEmail: $userEmail) {
      userName
      email
    }
  }
`;
