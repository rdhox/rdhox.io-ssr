import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';
import { useMediaQuery } from 'react-responsive';
import Line from './Line';
import timing from '../config/timing';

interface AnimLine2Props {
  toggle: boolean;
}

const AnimLine2 = ({ toggle }: AnimLine2Props) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const angle = isTabletOrMobile ? 'rotateZ(-10deg)' : 'rotateZ(-30deg)';

  const angleAnim = useSpring({
    from: {
      transform: 'rotateZ(0deg)',
      transformOrigin: 'bottom right',
    },
    to: {
      transform: toggle ? angle : 'rotateZ(0deg)',
      transformOrigin: 'bottom right',
    },
    config: config.stiff,
  });

  return (
    <Container>
      <animated.div style={angleAnim}>
        <Line angle={-90} />
      </animated.div>
    </Container>
  );
};

const animDesk = keyframes`
  0% {
    opacity: 0;
    top: -1500px;
  }
  80% {
    opacity: 1;
    top: -110px;
  }
  100% {
    opacity: 1;
    top: -100px;
  }
`;

const animMobile = keyframes`
  0% {
    opacity: 0;
    top: -1500px;
  }
  80% {
    opacity: 1;
    top: -73px;
  }
  100% {
    opacity: 1;
    top: -63px;
  }
`;

const Container = styled.div`
  position: relative;
  left: -400px;
  opacity: 0;
  animation-name: ${animDesk};
  animation-timing-function: ease-out;
  animation-duration: ${timing.durationLine2};
  animation-delay: ${timing.delayLine2};
  animation-fill-mode: forwards;
  transform-origin: bottom right;

  @media (max-width: 750px) {
    left: -200px;
    animation-name: ${animMobile};
  }
`;

export default AnimLine2;
