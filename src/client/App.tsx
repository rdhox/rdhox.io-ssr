import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';
import { useCreateToggleScroll } from './customHooks';

function App() {
  const [toggleContact, setToggleContact] = useState(false);
  const [toggleExps, setToggleExps] = useState(false);

  const { valuesLangCtxt, ToggleProvider, bindGesture } = useCreateToggleScroll(
    setToggleContact,
    toggleContact,
    setToggleExps,
    toggleExps
  );

  return (
    <div className="min-h-screen touch-none" {...bindGesture()}>
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
