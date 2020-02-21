import React, { useState } from 'react';
import './style.css';
import MainLayout from './layout/MainLayout';
import { createToggleScroll } from './customHooks';

function App() {

  const [ toggleContact, setToggleContact ] = useState(false);
  const [ toggleExps, setToggleExps ] = useState(false);

  const {
    valuesLangCtxt,
    ToggleProvider,
    bindGesture
  } = createToggleScroll(setToggleContact, toggleContact, setToggleExps, toggleExps);

  return (
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
  );
}

export default App;
