/* eslint-disable no-param-reassign */
import React from 'react';

import mailPicto from '../assets/svg/at.svg';
import maltPicto from '../assets/svg/malt.svg';
import githubPicto from '../assets/svg/github.svg';
import twitterPicto from '../assets/svg/twitter.svg';
import blablafootPicto from '../assets/blablafoot.png';
import nuliPicto from '../assets/nuli.png';
import homoFaberPicto from '../assets/homoFaber.png';
import dialPicto from '../assets/dial.png';
import icecreamPicto from '../assets/icecream.png';
import nelioPicto from '../assets/nelio.png';
import noodPicto from '../assets/nood.png';
import passrelPicto from '../assets/passrel.png';
import tecknowmetrixPicto from '../assets/tecknowmetrix.png';
import soundsuitPicto from '../assets/soundsuit.png';
import clineappPicto from '../assets/clineapp.png';
import sherfiPicto from '../assets/sherfi.png';
import campusPicto from '../assets/campus.png';
import simplonPicto from '../assets/simplon.png';

const svgs = {
  mailIcon: mailPicto,
  maltIcon: maltPicto,
  githubIcon: githubPicto,
  twitterIcon: twitterPicto,
  blablafootIcon: blablafootPicto,
  nuliIcon: nuliPicto,
  homoFaberIcon: homoFaberPicto,
  dialIcon: dialPicto,
  icecreamIcon: icecreamPicto,
  nelioIcon: nelioPicto,
  noodIcon: noodPicto,
  passrelIcon: passrelPicto,
  tecknowmetrixIcon: tecknowmetrixPicto,
  soundsuitIcon: soundsuitPicto,
  clineappIcon: clineappPicto,
  sherfiIcon: sherfiPicto,
  campusIcon: campusPicto,
  simplonIcon: simplonPicto,
} as const;

export type PictoName = keyof typeof svgs;

interface PictoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  icon: PictoName;
}

const Picto = ({ icon, className = '', ...rest }: PictoProps) => {
  return (
    <img
      className={`h-[54px] w-[54px] rounded-[5px] max-[750px]:h-[35px] max-[750px]:w-[35px] ${className}`}
      src={svgs[icon]}
      alt={icon}
      {...rest}
    />
  );
};

export default Picto;
