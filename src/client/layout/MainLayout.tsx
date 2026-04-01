import React from 'react';
import Main from '../components/Main';

interface MainLayoutProps {
  toggleContact: boolean;
  setToggleContact: React.Dispatch<React.SetStateAction<boolean>>;
  toggleExps: boolean;
  setToggleExps: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLayout = ({
  toggleContact,
  setToggleContact,
  toggleExps,
  setToggleExps,
}: MainLayoutProps) => {
  return (
    <Main
      toggleContact={toggleContact}
      setToggleContact={setToggleContact}
      toggleExps={toggleExps}
      setToggleExps={setToggleExps}
    />
  );
};

export default MainLayout;
