import React from 'react';
import styled from 'styled-components';
import Contacts from './Contacts';
import Title from './Title';
import Job from './Job';
import Exps from './Exps';
import AnimLine1 from './AnimLine1';
import AnimLine2 from './AnimLine2';
import SwitchLang from './SwitchLang';

interface MainProps {
  toggleContact: boolean;
  setToggleContact: React.Dispatch<React.SetStateAction<boolean>>;
  toggleExps: boolean;
  setToggleExps: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({
  toggleContact,
  setToggleContact,
  toggleExps,
  setToggleExps,
}: MainProps) => {
  return (
    <Container>
      <SwitchLang />
      <Contacts toggle={toggleContact} />
      <AnimLine1 toggle={toggleContact} />
      <Title handleToggleContact={setToggleContact} />
      <Job handleToggleExps={setToggleExps} />
      <AnimLine2 toggle={toggleExps} />
      <Exps toggle={toggleExps} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  padding-top: 70px;
`;

export default Main;
