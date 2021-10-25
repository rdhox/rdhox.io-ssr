import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import MainLayout from './layout/MainLayout';
import { createToggleScroll } from './customHooks';

const GlobalStyle = createGlobalStyle`
  html {
    position: fixed;
  }
  body {
    position: fixed;
    width: 100%;
    overscroll-behavior-y: none;
    overflow: hidden;
    padding: 0;
    margin: 0;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
`;

function App() {

  const [ toggleContact, setToggleContact ] = useState(false);
  const [ toggleExps, setToggleExps ] = useState(false);

  const {
    valuesLangCtxt,
    ToggleProvider,
    bindGesture
  } = createToggleScroll(setToggleContact, toggleContact, setToggleExps, toggleExps);

  return (
    <>
      <GlobalStyle />
      <div {...bindGesture()}>
        <ToggleProvider value={valuesLangCtxt}>
          <MainLayout
            toggleContact={toggleContact}
            setToggleContact={setToggleContact}
            toggleExps={toggleExps}
            setToggleExps={setToggleExps}
          />
        </ToggleProvider>
      </div>
    </>
  );
}

export default App;
