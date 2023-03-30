export const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 10, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
