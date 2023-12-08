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

export const LOGIN_USER = `
  mutation Login($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    user {
      _id
      userName
      email
    }
    accessToken
  }
}
`;

export const UPDATE_USER = gql`
  mutation UpdateUserFromUserDoc($updateUserInput: UpdateUserInput!) {
    updateUserFromUserDoc(updateUserInput: $updateUserInput) {
      _id
      userName
      email
      age
      address
      bio
      profilePicture
    }
  }
`;

export const UPDATE_USER_PROFILE_PICTURE = gql`
  mutation UpdateUserProfilePicture(
    $updateProfilePicture: UpdateProfilePictureInput!
  ) {
    updateUserProfilePicture(updateProfilePicture: $updateProfilePicture) {
      _id
      userName
      email
      age
      address
      bio
      profilePicture
    }
  }
`;

export const CREATE_CAT = gql`
  mutation CreateCat($createCatInput: CreateCatInput!) {
    createCat(createCatInput: $createCatInput) {
      title
      description
      tags
      catVideo
    }
  }
`;

export const UPDATE_CAT = gql`
  mutation UpdateCatFromCatDoc($updateCatInput: UpdateCatInput!) {
    updateCatFromCatDoc(updateCatInput: $updateCatInput) {
      title
      tags
      description
    }
  }
`;

export const DELETE_CAT = gql`
  mutation DeleteCatFromCatDoc($catId: String!) {
    deleteCatFromCatDoc(catId: $catId)
  }
`;
