import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import {animated } from 'react-spring';
import { useToggleScroll } from '../customHooks';
import TextTitle from './TextTitle';
import SubTextTitle from './SubTextTitle';
import timing from '../config/timing';



const Title = ({handleToggleContact}) => {

  const handleToggle = () => {
    handleToggleContact(t => !t);
  }

  const [ toggleAnim, lang ] = useToggleScroll(); 
  const styleSub = { alignSelf: 'flex-start'};
  return (
    <Container onClick={handleToggle}>
      <animated.div style={toggleAnim}>
        <Wrapper>
          <TextTitle lang={lang} bold spacing={1}>blaz</TextTitle>
          <SubAnim>
            <SubTextTitle style={styleSub} lang={lang} spacing={1} italic color="grey">name</SubTextTitle>
          </SubAnim>
        </Wrapper>
      </animated.div>
    </Container>
  );
}

const animation = keyframes`
  0% {
    opacity: 0;
    left: -300%;
  }
  60% {
    opacity: 1;
    left: -5%;
  }
  100% {
    opacity: 1;
    left: 0%;
  }
`;

const Container = styled.div`
  position: relative;
  width: 480px;
  opacity: 0;
  margin-bottom: 30px;
  animation-name: ${animation};
  animation-duration: ${timing.durationTitle};
  animation-delay: ${timing.delayTitle};
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  perspective: 350px;
  cursor: pointer;

  @media (max-width: 750px) {
    width: 230px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const subAnim = keyframes`
  0% {
    opacity: 0;
    left: -200%;
  }
  80% {
    opacity: 1;
    left: 5%;
  }
  100% {
    opacity: 1;
    left: 0%;
  }
`;

const SubAnim = styled.div`
  position: relative;
  opacity: 0;
  animation-name: ${subAnim};
  animation-duration: ${timing.durationSubTitle};
  animation-delay: ${timing.delaySubTitle};
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

Title.propTypes = {
  handleToggleContact: PropTypes.func.isRequired,
};
 
export default Title;