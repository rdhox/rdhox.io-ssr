import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Contacts from './Contacts';
import Title from './Title';
import Job from './Job';
import Exps from './Exps';
import AnimLine1 from './AnimLine1';
import AnimLine2 from './AnimLine2';
import SwitchLang from './SwitchLang';

const Main = ({
  toggleContact,
  setToggleContact,
  toggleExps,
  setToggleExps
}) => {
  return (
    <Container>
      <SwitchLang />
      <Contacts toggle={toggleContact} />
      <AnimLine1 toggle={toggleContact} />
      <Title handleToggleContact={setToggleContact} />
      <Job handleToggleExps={setToggleExps} />
      <AnimLine2 toggle={toggleExps}/>
      <Exps toggle={toggleExps}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  padding-top: 70px;
`;

Main.propTypes = {
  toggleContact: PropTypes.bool.isRequired,
  setToggleContact: PropTypes.func.isRequired,
  toggleExps: PropTypes.bool.isRequired,
  setToggleExps: PropTypes.func.isRequired
};
 
export default Main;