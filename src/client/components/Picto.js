/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mailPicto from '../assets/svg/at.svg';
import maltPicto from '../assets/svg/malt.svg';
import githubPicto from '../assets/svg/github.svg';
import twitterPicto from '../assets/svg/twitter.svg';
import blablafootPicto from '../assets/blablafoot.png';
import nuliPicto from '../assets/nuli.png';
import dialPicto from '../assets/dial.png';
import icecreamPicto from '../assets/icecream.png';
import nelioPicto from '../assets/nelio.png';
import noodPicto from '../assets/nood.png';
import passrelPicto from '../assets/passrel.png';
import tecknowmetrixPicto from '../assets/tecknowmetrix.png';

const svgs = {
  mailIcon: mailPicto,
  maltIcon: maltPicto,
  githubIcon: githubPicto,
  twitterIcon: twitterPicto,
  blablafootIcon: blablafootPicto,
  nuliIcon: nuliPicto,
  dialIcon: dialPicto,
  icecreamIcon: icecreamPicto,
  nelioIcon: nelioPicto,
  noodIcon: noodPicto,
  passrelIcon:  passrelPicto,
  tecknowmetrixIcon:  tecknowmetrixPicto,
};

const Picto = props => {
  const { icon } = props;

  return <Img src={svgs[icon]} alt={icon} {...props} />;
}

const Img = styled.img`
  width: 54px;
  height: 54px;

  @media (max-width: 750px) {
    width: 35px;
    height: 35px;
  }
`;

Picto.propTypes = {
  icon: PropTypes.oneOf(Object.keys(svgs)).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
};

Picto.defaultProps = {
  width: undefined,
  height: undefined,
  color: undefined
};

export default Picto;
