import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Line = props => <Container {...props} />;

const Container = styled.div`
  width: 130px;
  height: 5px;
  background-color: ${({color}) => color};
  border-radius: ${({radius}) => radius+'px'};
  transform: ${({angle}) => `rotateZ(${angle}deg)`};
  transform-origin: bottom right;

  @media (max-width: 750px) {
    width: 80px;
    height: 3px
  }

`;

Line.propType = {
  length: PropTypes.number,
  thickness: PropTypes.number,
  color: PropTypes.string,
  radius: PropTypes.number,
  angle: PropTypes.number
};

Line.defaultProps = {
  length: 100,
  thickness: 3,
  color: 'black',
  radius: 2,
  angle: 0
};
 
export default Line;