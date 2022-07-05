import React from 'react';
import Router from './Router'
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}
`

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  )
}
export default App;
