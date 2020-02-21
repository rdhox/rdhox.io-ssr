import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTrail, animated} from 'react-spring';
import Icon from './Icon';
import icons from '../config/iconContacts';

const Contacts = ({toggle}) => {

  const contactsAnim = useTrail( icons.length, {
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'translateX(0px)' : 'translateX(150px)',
      display:'block'
    },
    from: { 
      opacity: 0,
      transform: 'translateX(150px)',
      display:'none'
    },
    config: { mass: 0.4, tension: 500, friction: 20 },
    delay: 200
  });

  const [ display, setDisplay ] = useState(false);

  useEffect(() => {
    if(toggle && !display) {
      setDisplay(true);
    }
    if(!toggle && display){
      setTimeout(() => {
        setDisplay(false);
      }, 1000);
    }
  },[toggle]);

  return (
    <Container>
      {display && contactsAnim.map((styles, index) => (
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
}

const Container = styled.div`
  position: relative;
  top: 0;
  right: -70px;
  width: 350px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  @media (max-width: 750px) {
    top: -15px;
    right: -25px;
    width: 200px;
    height: 50px;
  }

`;

Contacts.propTypes = {
  toggle: PropTypes.bool.isRequired
};
 
export default Contacts;