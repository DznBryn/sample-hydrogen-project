import { gql } from '@apollo/client';

export const GET_ALL_PETS = gql`
  query GetAllPets {
    allPet { #fix this!!!
      name
    }
  }
`;