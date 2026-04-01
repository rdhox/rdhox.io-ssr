import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTrail, animated } from '@react-spring/web';
import Icon from './Icon';
import icons from '../config/iconContacts';

interface ContactsProps {
  toggle: boolean;
}

const Contacts = ({ toggle }: ContactsProps) => {
  const contactsAnim = useTrail(icons.length, {
    from: {
      opacity: 0,
      transform: 'translateX(150px)',
      display: 'none' as const,
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'translateX(0px)' : 'translateX(150px)',
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
      }, 500);
    }
  }, [toggle]);

  return (
    <Container>
      {display &&
        contactsAnim.map((styles, index) => (
          <animated.div key={index} style={styles}>
            <Icon
              name={icons[index].name}
              title={icons[index].title}
              url={icons[index].url}
            />
          </animated.div>
        ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 0;
  right: -110px;
  width: 230px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  @media (max-width: 750px) {
    top: -15px;
    right: -40px;
    width: 150px;
    height: 50px;
  }
`;

export default Contacts;
