import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import lg from '../config/lang.json';

const TextJob = (props) => {
  const {
      children,
      lang,
      color,
      italic,
      bold,
      spacing
  } = props;
  return (
  <Container
    color={color}
    italic={italic}
    bold={bold}
    spacing={spacing}
    {...props}
  >
    {lg[lang][children]}
  </Container>
  );
}

const Container = styled.span`
  font-size: 34px;
  color: ${({color}) => color};
  font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
  font-style: ${({italic}) => italic ? 'italic' : 'normal'};
  letter-spacing: ${({spacing}) => spacing+'px'};

  @media (max-width: 750px) {
    font-size: 18px;
  }

`;

TextJob.propTypes = {
  children : PropTypes.string.isRequired,
  lang : PropTypes.string,
  color : PropTypes.string,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  spacing: PropTypes.number,
};

TextJob.defaultProps = {
  lang: 'fr',
  color: 'black',
  italic: false,
  bold: false,
  spacing: 'normal',
};
 
export default TextJob;