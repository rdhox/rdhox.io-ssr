import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import lg from '../config/lang.json';

const SubTextJob = (props) => {
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
  font-size: 24px;
  color: ${({color}) => color};
  font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
  font-style: ${({italic}) => italic ? 'italic' : 'normal'};
  letter-spacing: ${({spacing}) => spacing+'px'};

  @media (max-width: 750px) {
    font-size: 14px;
  }

`;

SubTextJob.propTypes = {
  children : PropTypes.string.isRequired,
  lang : PropTypes.string,
  color : PropTypes.string,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  spacing: PropTypes.number,
};

SubTextJob.defaultProps = {
  lang: 'fr',
  color: 'black',
  italic: false,
  bold: false,
  spacing: 'normal',
};
 
export default SubTextJob;