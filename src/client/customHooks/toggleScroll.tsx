import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useSpring, config } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { detect } from 'detect-browser';

const browser = detect();

export type Lang = 'fr' | 'en';

export interface LangContextValue {
  flick: boolean;
  setFlick: React.Dispatch<React.SetStateAction<boolean>>;
  flickValue: number;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  lang: Lang;
}

export const LangCtxt = React.createContext<LangContextValue | null>(null);

export function useCreateToggleScroll(
  setToggleContact: React.Dispatch<React.SetStateAction<boolean>>,
  toggleContact: boolean,
  setToggleExps: React.Dispatch<React.SetStateAction<boolean>>,
  toggleExps: boolean
) {
  function handleMenu(limit: number, deltaX: number, direction: number) {
    if (Math.abs(deltaX) > limit) {
      if (direction < 0) {
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

  function handleToggle(limit: number, deltaY: number, coef: number) {
    if (Math.abs(deltaY) < limit) {
      setFlickValue(Math.abs(deltaY) * coef);
      setFlick(true);
    } else {
      if (!toggle) {
        setFlick(false);
        setToggle(t => !t);
      }
    }
  }

  const handleGestureWheel = (e: {
    delta: [number, number];
    axis: 'x' | 'y' | undefined;
  }) => {
    const { delta, axis } = e;
    if (axis === 'y') {
      switch (browser && browser.name) {
        case 'firefox':
          handleToggle(18, delta[1], 5);
          break;
        case 'chrome':
          handleToggle(18, delta[1], 5);
          break;
        case 'safari':
          handleToggle(18, delta[1], 5);
          break;
        case 'ios':
          handleToggle(18, delta[1], 5);
          break;
        default:
          console.error(
            'No browser detected, some strange behaviors may happen'
          );
          handleToggle(18, delta[1], 5);
      }
    }
  };

  const handleGestureDrag = (e: {
    event?: UIEvent;
    axis: 'x' | 'y' | undefined;
    direction: [number, number];
    distance: [number, number];
  }) => {
    if (e.event) {
      e.event.preventDefault();
    }
    const { axis, direction, distance } = e;
    if (axis === 'y') {
      handleToggle(250, Math.abs(distance[1]), 0.5);
    }
    if (axis === 'x') {
      handleMenu(140, Math.abs(distance[0]), direction[0]);
    }
  };

  const bindGesture = useGesture({
    onDrag: state => handleGestureDrag(state),
    onWheel: state => handleGestureWheel(state),
  });

  const [flick, setFlick] = useState(false);
  const [flickValue, setFlickValue] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    if (toggle) {
      setLang(l => (l === 'fr' ? 'en' : 'fr'));
    }
  }, [toggle]);

  const valuesLangCtxt = useMemo(
    () => ({
      flick,
      setFlick,
      flickValue,
      toggle,
      setToggle,
      lang,
    }),
    [flick, toggle, flickValue, lang]
  );

  return {
    valuesLangCtxt,
    ToggleProvider: LangCtxt.Provider,
    bindGesture,
  };
}

export function useToggleScroll(dir: number = 1) {
  const ctx = useContext(LangCtxt);
  if (!ctx) {
    throw new Error('useToggleScroll must be used within LangCtxt provider');
  }
  const { flick, setFlick, flickValue, toggle, setToggle, lang } = ctx;

  const [toggleAnimation] = useSpring(
    {
      from: { transform: 'rotateX(0deg)' },
      to: async (start, stop) => {
        if (toggle) {
          stop();
          await start({
            transform: `rotateX(${dir * (lang === 'fr' ? 0 : 720)}deg)`,
            config: config.stiff,
          });
        }
        if (flick) {
          await start({
            transform: `rotateX(${dir * (lang === 'fr' ? flickValue : 720 + flickValue)}deg)`,
            config: config.stiff,
          });
          await start({
            transform: `rotateX(${dir * (lang === 'fr' ? 0 : 720)}deg)`,
            config: config.stiff,
          });
        }
      },
      onRest: () => {
        if (flick) {
          setFlick(false);
        }
        if (toggle) {
          setToggle(false);
          setFlick(false);
        }
      },
    },
    [toggle, flick, flickValue, lang, dir]
  );

  return [toggleAnimation, lang] as const;
}
