import { gql } from "@apollo/client";

export const PRODUCT = gql`
query CategoryQuery($id: String!) {
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        id
        displayValue
        value
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`;
export const CATEGORIES = gql`
query CategoryQuery($input: CategoryInput) {
  categories {
    name
  }

  category(input: $input) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }

      brand
    }
  }
}
`;
export const CURRENCY = 
gql`
  query CategoryQuery {
    
          currencies {
            label
            symbol
          }
        }
      
`
;

export const ALLCATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;
 

