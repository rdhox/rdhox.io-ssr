import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import {animated } from 'react-spring';
import timing from '../config/timing';
import { useToggleScroll } from '../customHooks';
import TextJob from './TextJob';
import SubTextJob from './SubTextJob';

const Job  = ({handleToggleExps}) => {

  const handleToggle = () => {
    handleToggleExps(t => !t);
  }

  const [ toggleAnim, lang ] = useToggleScroll(-1); 
  const styleSub = { alignSelf: 'flex-end'};

  return (
    <Container onClick={handleToggle}>
      <animated.div style={toggleAnim}>
      <Wrapper>
          <TextJob lang={lang} bold spacing={1}>job</TextJob>
          <SubAnim>
            <SubTextJob style={styleSub} lang={lang} spacing={1} italic color="grey">subJob</SubTextJob>
          </SubAnim>
        </Wrapper>
      </animated.div>
    </Container>
  );
}

const animation = keyframes`
  0% {
    opacity: 0;
    right: -200%;
  }
  55% {
    opacity: 1;
    right: 5%;
  }
  100% {
    opacity: 1;
    right: 0%;
  }
`;

const Container = styled.div`
  position: relative;
  opacity: 0;
  margin-top: 30px;
  animation-name: ${animation};
  animation-timing-function: ease-out;
  animation-duration: ${timing.durationJob};
  animation-delay: ${timing.delayJob};
  animation-fill-mode: forwards;
  perspective: 350px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const subAnim = keyframes`
  0% {
    opacity: 0;
    right: -200%;
  }
  80% {
    opacity: 1;
    right: 5%;
  }
  100% {
    opacity: 1;
    right: 0%;
  }
`;

const SubAnim = styled.div`
  position: relative;
  opacity: 0;
  animation-name: ${subAnim};
  animation-duration: ${timing.durationSubJob};
  animation-delay: ${timing.delaySubJob};
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

Job.propTypes = {
  handleToggleExps: PropTypes.func.isRequired,
};
 
export default Job ;