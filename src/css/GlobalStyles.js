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
      --INFO: #7F5FFF;
      --SUCCESS: #23C7C7;
      --warning: #FFBB55;
      --ERROR: #FF7337;
      --OVERLAY1: rgba(51, 51, 51, 0.8);
      --OVERLAY2: rgba(51, 51, 51, 0.6);
      --OVERLAY3: rgba(51, 51, 51, 0.4);
      //쉐도우
      --SHADOW1: 0px 2px 2px rgba(153, 153, 153, 0.2), 0px 3px 1px rgba(153, 153, 153, 0.2), 0px -2px 5px rgba(153, 153, 153, 0.2);
      --SHADOW2: 0px 6px 10px rgba(153, 153, 153, 0.2), 0px 1px 18px rgba(153, 153, 153, 0.2), 0px 3px 5px rgba(153, 153, 153, 0.2);
      --SHADOW3: 0px 12px 17px rgba(153, 153, 153, 0.2), 0px 5px 22px rgba(153, 153, 153, 0.2), 0px 7px 8px rgba(153, 153, 153, 0.2);
      //투명도
      --OPACITY1: 0.2;
      --OPACITY2: 0.4;
      --OPACITY3: 0.6;
      --OPACITY4: 0.8;
      --OPACITY5: 1;      

    }
    * {
      margin: 0;
      padding: 0;
      /* text-align: center; */
      box-sizing: border-box;
    }
    html{
      /* max-width: 100vw;
      overflow: hidden; */
    }
    body {}
    p,h1,h2,h3,h4{padding:0; margin:0;}
    ul,li,ol {
      list-style:none;
    }
    
`;
export const Container = styled.div`
  padding: 0 16px;
  /* width: 100%; */
`;



export default GlobalStyles;