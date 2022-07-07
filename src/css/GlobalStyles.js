import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
  --BLACK: #000;
  --DARKEST: #333;
  --DARKER: #5A5A5A;
  --DEFAULT: #999;
  --LIGHTER: #ccc;
  --LIGHTEST: #eee;
  --WHITE: #fff;
  --INFO: #4724FB;
  --SUCCESS: #27AE60;
  --warning: #E2B93B;
  --ERROR: #EB5757;
  --OVERLAY1: rgba(51, 51, 51, 0.8);
  --OVERLAY2: rgba(51, 51, 51, 0.6);
  --OVERLAY3: rgba(51, 51, 51, 0.4);
}
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
  a {
    text-decoration:none;
  }
`;

const Header = styled.div`
  height: 52px;
  width: 100%;
  padding: 0 20px 0 24px;
`;

export default GlobalStyles;
