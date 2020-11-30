import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    html {
      height: 100%;
    }
    
    body {
      height: 100%;
    }
    
    #root {
      height: 100%;
    }
    
    ol,ul {
      list-style: none;
    }

    *{
      box-sizing:border-box;
    }

    a{
      text-decoration:none;
      color:inherit;
      cursor: pointer;
    }

    ol, ul, li {
      list-style: none;
    }

`;

export default GlobalStyles;