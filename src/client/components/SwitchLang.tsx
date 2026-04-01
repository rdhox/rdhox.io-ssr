import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { detect } from 'detect-browser';

import frenchFlag from '../assets/frenchflag.png';
import britainFlag from '../assets/britainflag.png';
import wheel from '../assets/wheel.png';
import swipe from '../assets/swipe.png';
import { LangCtxt } from '../customHooks/toggleScroll';
import timing from '../config/timing';

const browser = detect();

const SwitchLang = () => {
  const ctx = useContext(LangCtxt);
  if (!ctx) {
    throw new Error('SwitchLang must be used within LangCtxt provider');
  }
  const { lang } = ctx;
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  useEffect(() => {
    if (browser?.os) {
      const deviceName = ['iOS', 'Android OS'].includes(browser.os)
        ? 'mobile'
        : 'desktop';
      setDevice(deviceName);
    }
  }, []);

  return (
    <Container>
      <ImgFlag isBig={lang === 'fr'} src={frenchFlag} alt="french_flag" />
      {device === 'mobile' ? (
        <Img src={swipe} alt="swipe" />
      ) : (
        <Img src={wheel} alt="wheel" />
      )}
      <ImgFlag isBig={lang === 'en'} src={britainFlag} alt="britain_flag" />
    </Container>
  );
};

const animOpacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation-name: ${animOpacity};
  animation-timing-function: ease-out;
  animation-duration: ${timing.langDuration};
  animation-delay: ${timing.langDelay};
  animation-fill-mode: forwards;
`;

const ImgFlag = styled.img<{ isBig: boolean }>`
  width: ${({ isBig }) => (isBig ? '30px' : '15px')};
  height: ${({ isBig }) => (isBig ? '30px' : '15px')};
  transition:
    width 0.2s ease-out,
    height 0.2s ease-out;
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
`;

export default SwitchLang;
