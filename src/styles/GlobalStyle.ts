import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ul,
  ol {
    padding: 6px 0px 0px 20px;
  }
  ul li,
  ol li {
    padding: 0px 0px 8px 4px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
