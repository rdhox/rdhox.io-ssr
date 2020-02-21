import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useSpring, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { detect } from 'detect-browser';

const browser = detect();

const LangCtxt = React.createContext();

export function useCreateToggleScroll(
  setToggleContact,
  toggleContact,
  setToggleExps,
  toggleExps
) {

  function handleMenu( limit ,deltaX, direction) {
    if(Math.abs(deltaX) > limit) {
      if(direction < 0){
        if (!toggleContact && !toggleExps) {
          setToggleContact(true);
        } else if (!toggleContact && toggleExps) {
          setToggleExps(false);
        }
      } else if (direction > 0) {
        if (!toggleContact && !toggleExps) {
          setToggleExps(true);
        } else if (toggleContact && !toggleExps) {
          setToggleContact(false);
        }
      }
    }
  }

  function handleToggle(limit, deltaY, coef) {
    if(Math.abs(deltaY) < limit) {
      setFlickValue(Math.abs(deltaY)*coef);
      setFlick(true);
    } else {
      if(!toggle) {
        setFlick(false);
        setToggle(t => !t);
      }
    }
  }

  const handleGestureWheel = e => {
    const { delta, axis} = e;
    if(axis === 'y') {
      switch(browser && browser.name) {
        case 'firefox':
          handleToggle(18, delta[1], 5);
          break;
        case 'chrome':
          handleToggle(700, delta[1], 0.1);
          break;
        case 'safari':
          handleToggle(700, delta[1], 0.1);
          break;
        case 'ios':
          handleToggle(18, delta[1], 5);
          break;
        default:
          console.error('No browser detected, some strange behaviors may happen');
          handleToggle(700, delta[1], 0.1);
      }
    }
  }

  const handleGestureDrag = e => {
    if(e.event) {
      e.event.preventDefault();
    }
    const { axis, direction, distance} = e;
    if(axis === 'y') {
      handleToggle(250, distance, 0.5);
    }
    if (axis === 'x') {
      handleMenu(140, distance, direction[0]);
    }
  }

  const bindGesture = useGesture(
    {
      onDrag: state => handleGestureDrag(state),
      onWheel: state => handleGestureWheel(state),
    }
  );


  const [flick, setFlick] = useState(false);
  const [flickValue, setFlickValue] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    if (toggle) {
      setLang(l => l === 'fr' ? 'en' : 'fr');
    }
  }, [toggle]);

  const valuesLangCtxt = useMemo(() => ({
    flick,
    setFlick,
    flickValue,
    toggle,
    setToggle,
    lang
  }), [flick, toggle, flickValue, lang]);

  return {
    valuesLangCtxt,
    ToggleProvider: LangCtxt.Provider,
    bindGesture
  };
}

export function useToggleScroll(dir = 1) {
  const {
    flick,
    setFlick,
    flickValue,
    toggle,
    setToggle,
    lang
  } = useContext(LangCtxt);

  const toggleAnimation = useSpring({
    to: async (next, cancel) => {
      if(toggle) {
        cancel();
        await next({
          transform: `rotateX(${dir * (lang === 'fr' ? 0 : 720)}deg)`,
          config: config.stiff
        });
      }
      if (flick) {
        await next({
          transform: `rotateX(${dir * (lang === 'fr' ? flickValue : 720 + flickValue)}deg)`,
          config: config.stiff
        });
        await next({
          transform: `rotateX(${dir * (lang === 'fr' ? '0' : '720')}deg)`,
          config: config.stiff
        });
      }
    },
    from: {transform: 'rotateX(0deg)'},
    onRest: () => {
      if(flick) {
        setFlick(false);
      }
      if(toggle) {
        setToggle(false);
        setFlick(false);
      }
    }
  });

  return [ toggleAnimation, lang ];

}