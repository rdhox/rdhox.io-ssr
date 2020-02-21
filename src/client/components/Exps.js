import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTrail, animated} from 'react-spring';
import Icon from './Icon';
import icons from '../config/iconExps';

const Exps = ({toggle}) => {
  const contactsAnim = useTrail( icons.length, {
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'translateX(0px)' : 'translateX(-150px)',
      display:'block'
    },
    from: { 
      opacity: 0,
      transform: 'translateX(-150px)',
      display:'none'
    },
    config: { mass: 0.4, tension: 500, friction: 20 },
    delay: 200,
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
  top: 10px;
  left: 45px;
  width: 600px;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  @media (max-width: 1224px) {
    top: 20px;
    left: 0px;
    width: 280px;
    height: 100px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

Exps.propTypes = {
  toggle: PropTypes.bool.isRequired
};
 
export default Exps;