import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTrail, animated } from '@react-spring/web';
import Icon from './Icon';
import icons from '../config/iconExps';

interface ExpsProps {
  toggle: boolean;
}

const Exps = ({ toggle }: ExpsProps) => {
  const contactsAnim = useTrail(icons.length, {
    from: {
      opacity: 0,
      transform: 'translateX(-150px)',
      display: 'none' as const,
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'translateX(0px)' : 'translateX(-150px)',
      display: 'block' as const,
    },
    config: { mass: 0.4, tension: 500, friction: 20 },
    delay: 200,
  });

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (toggle && !display) {
      setDisplay(true);
    }
    if (!toggle && display) {
      setTimeout(() => {
        setDisplay(false);
      }, 1000);
    }
  }, [display, toggle]);

  return (
    <Container>
      {display &&
        contactsAnim.map((styles, index) => (
          <animated.div key={index} style={styles}>
            <Icon
              name={icons[index].name}
              title={icons[index].title}
              url={icons[index].url}
              background={false}
            />
          </animated.div>
        ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 10px;
  left: 45px;
  width: 600px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;

  @media (max-width: 750px) {
    top: 20px;
    left: 0px;
    width: 280px;
    height: 100px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export default Exps;
