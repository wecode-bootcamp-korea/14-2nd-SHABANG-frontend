import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
    @import url("https://spoqa.github.io/spoqa-han-sans/ko-KR/");
    
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
