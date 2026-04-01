import React, { useContext, useState, useEffect } from 'react';
import { detect } from 'detect-browser';

import frenchFlag from '../assets/frenchflag.png';
import britainFlag from '../assets/britainflag.png';
import wheel from '../assets/wheel.png';
import swipe from '../assets/swipe.png';
import { LangCtxt } from '../customHooks/toggleScroll';

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

  const flagClass = (isBig: boolean) =>
    isBig
      ? 'h-[30px] w-[30px] max-h-[30px] max-w-[30px] transition-[width,height] duration-200 ease-out'
      : 'h-[15px] w-[15px] max-h-[15px] max-w-[15px] transition-[width,height] duration-200 ease-out';

  const frBig = lang === 'fr';
  const enBig = lang === 'en';

  return (
    <div className="absolute right-[30px] top-[20px] flex animate-lang-fade items-center justify-center opacity-0">
      <img
        className={flagClass(frBig)}
        src={frenchFlag}
        alt="french_flag"
        width={frBig ? 30 : 15}
        height={frBig ? 30 : 15}
        style={{ width: frBig ? 30 : 15, height: frBig ? 30 : 15, objectFit: 'contain' }}
      />
      {device === 'mobile' ? (
        <img
          className="h-5 w-5 max-h-5 max-w-5"
          src={swipe}
          alt="swipe"
          width={20}
          height={20}
          style={{ width: 20, height: 20, objectFit: 'contain' }}
        />
      ) : (
        <img
          className="h-5 w-5 max-h-5 max-w-5"
          src={wheel}
          alt="wheel"
          width={20}
          height={20}
          style={{ width: 20, height: 20, objectFit: 'contain' }}
        />
      )}
      <img
        className={flagClass(enBig)}
        src={britainFlag}
        alt="britain_flag"
        width={enBig ? 30 : 15}
        height={enBig ? 30 : 15}
        style={{ width: enBig ? 30 : 15, height: enBig ? 30 : 15, objectFit: 'contain' }}
      />
    </div>
  );
};

export default SwitchLang;
