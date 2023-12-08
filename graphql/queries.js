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

export const GET_CAT_BY_ID = gql`
  query FindCatById($catId: String!) {
    findCatById(catId: $catId) {
      _id
      title
      description
      tags
    }
  }
`;
