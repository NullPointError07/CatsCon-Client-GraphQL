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

export const GET_USER_BY_EMAIL = `
  query UserByEmail($userEmail: String!) {
    userByEmail(userEmail: $userEmail) {
      _id
      userName
      email
    }
  }
`;

export const GET_CATS = gql`
  query CatsAll {
    catsAll {
      _id
      creator {
        _id
        userName
      }
      title
      description
      tags
      catVideo
    }
  }
`;
