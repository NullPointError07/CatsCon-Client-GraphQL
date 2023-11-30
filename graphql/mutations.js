import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($signupInput: CreateUserInput!) {
    signup(signupInput: $signupInput) {
      userName
      email
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      authToken
    }
  }
`;
