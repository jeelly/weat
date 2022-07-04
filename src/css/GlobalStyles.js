import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        text-align: center;
        box-sizing: border-box;
    }
  body {}
  ul,li,ol {
    list-style:none;
}
`;
export default GlobalStyles;