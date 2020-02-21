import React from 'react';
import PropTypes from 'prop-types';
import Main from '../components/Main';

const MainLayout = ({
  toggleContact,
  setToggleContact,
  toggleExps,
  setToggleExps
}) => {
  return <Main
    toggleContact={toggleContact}
    setToggleContact={setToggleContact}
    toggleExps={toggleExps}
    setToggleExps={setToggleExps}
  />;
}

MainLayout.propTypes = {
  toggleContact: PropTypes.bool.isRequired,
  setToggleContact: PropTypes.func.isRequired,
  toggleExps: PropTypes.bool.isRequired,
  setToggleExps: PropTypes.func.isRequired
};
 
export default MainLayout;