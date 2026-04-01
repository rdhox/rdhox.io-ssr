import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useSpring, type SpringValue } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useMediaQuery } from 'react-responsive';

export type Lang = 'fr' | 'en';

export interface LangContextValue {
  lang: Lang;
  flipDeg: SpringValue<number>;
  /** +1 (scroll down / swipe down) or -1 (scroll up / swipe up). */
  flipDir: SpringValue<number>;
}

export const LangCtxt = React.createContext<LangContextValue | null>(null);

const WHEEL_FLIP_ACCUM = 72;
const DRAG_TOGGLE_DESKTOP = 250;
const DRAG_TOGGLE_MOBILE = 120;
const AXIS_RATIO = 1.15;

/**
 * Single rotation 0 → 180°.
 * Language changes at exactly 90° (text is edge-on, invisible).
 * The spring overshoots a bit past 180 then settles — natural deceleration.
 */
const spinConfig = { tension: 280, friction: 18 };

export function useCreateToggleScroll(
  setToggleContact: React.Dispatch<React.SetStateAction<boolean>>,
  toggleContact: boolean,
  setToggleExps: React.Dispatch<React.SetStateAction<boolean>>,
  toggleExps: boolean
) {
  const isNarrow = useMediaQuery({ maxWidth: 750 });
  const dragToggleAt = isNarrow ? DRAG_TOGGLE_MOBILE : DRAG_TOGGLE_DESKTOP;

  const [lang, setLang] = useState<Lang>('fr');
  const animatingRef = useRef(false);
  const langChangedRef = useRef(false);

  const wheelAcc = useRef(0);
  const wheelIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [flipSpring, flipApi] = useSpring(() => ({ deg: 0, dir: 1 }));

  const triggerFlip = useCallback(
    (gestureDir: number) => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      langChangedRef.current = false;

      wheelAcc.current = 0;
      if (wheelIdleTimer.current) {
        clearTimeout(wheelIdleTimer.current);
        wheelIdleTimer.current = null;
      }

      const sign = gestureDir >= 0 ? 1 : -1;

      flipApi.stop();
      flipApi.set({ dir: sign });
      flipApi.start({
        from: { deg: 0 },
        to: { deg: 360, config: spinConfig },
        onChange: (result) => {
          if (langChangedRef.current) return;
          const d = (result.value as { deg: number }).deg;
          if (d >= 90) {
            langChangedRef.current = true;
            setLang(l => (l === 'fr' ? 'en' : 'fr'));
          }
        },
        onRest: () => {
          flipApi.set({ deg: 0 });
          animatingRef.current = false;
        },
      });
    },
    [flipApi]
  );

  // --- Horizontal swipe: open/close Contacts or Exps panels ---

  const handleMenu = useCallback(
    (limit: number, deltaX: number, direction: number) => {
      if (Math.abs(deltaX) <= limit) return;
      if (direction < 0) {
        if (!toggleContact && !toggleExps) setToggleContact(true);
        else if (!toggleContact && toggleExps) setToggleExps(false);
      } else if (direction > 0) {
        if (!toggleContact && !toggleExps) setToggleExps(true);
        else if (toggleContact && !toggleExps) setToggleContact(false);
      }
    },
    [setToggleContact, setToggleExps, toggleContact, toggleExps]
  );

  // --- Wheel ---

  const handleWheel = useCallback(
    (e: { delta: [number, number]; axis: 'x' | 'y' | undefined }) => {
      if (animatingRef.current) return;
      if (e.axis === 'x') return;

      wheelAcc.current += e.delta[1];

      if (Math.abs(wheelAcc.current) >= WHEEL_FLIP_ACCUM) {
        const sign = wheelAcc.current > 0 ? 1 : -1;
        triggerFlip(sign);
        return;
      }

      if (wheelIdleTimer.current) clearTimeout(wheelIdleTimer.current);
      wheelIdleTimer.current = setTimeout(() => {
        wheelAcc.current = 0;
        wheelIdleTimer.current = null;
      }, 280);
    },
    [triggerFlip]
  );

  // --- Drag / swipe ---

  const handleDrag = useCallback(
    (e: {
      event?: UIEvent;
      movement: [number, number];
      direction: [number, number];
      last: boolean;
    }) => {
      if (animatingRef.current) return;
      if (e.event && 'preventDefault' in e.event) e.event.preventDefault();

      const { movement, direction, last } = e;
      if (!last) return;

      const absX = Math.abs(movement[0]);
      const absY = Math.abs(movement[1]);

      if (absY > absX * AXIS_RATIO) {
        if (absY >= dragToggleAt) {
          triggerFlip(movement[1] > 0 ? 1 : -1);
        }
        return;
      }

      if (absX > absY * AXIS_RATIO) {
        handleMenu(140, absX, direction[0]);
      }
    },
    [handleMenu, dragToggleAt, triggerFlip]
  );

  // --- Cleanup ---

  useEffect(() => {
    return () => {
      if (wheelIdleTimer.current) clearTimeout(wheelIdleTimer.current);
    };
  }, []);

  // --- Gesture binding ---

  const bindGesture = useGesture(
    {
      onDrag: state => handleDrag(state),
      onWheel: state => handleWheel(state),
    },
    {
      drag: { filterTaps: true, threshold: 18, rubberband: false },
      wheel: { eventOptions: { passive: false } },
    }
  );

  // --- Context value ---

  const valuesLangCtxt = useMemo(
    () => ({ lang, flipDeg: flipSpring.deg, flipDir: flipSpring.dir }),
    [lang, flipSpring.deg, flipSpring.dir]
  );

  return {
    valuesLangCtxt,
    ToggleProvider: LangCtxt.Provider,
    bindGesture,
  };
}

// ---------------------------------------------------------------------------

export function useToggleScroll(dir: number = 1) {
  const ctx = useContext(LangCtxt);
  if (!ctx) {
    throw new Error('useToggleScroll must be used within LangCtxt provider');
  }
  const { lang, flipDeg, flipDir } = ctx;

  const style = useMemo(
    () => ({
      transform: flipDeg.to((d: number) => {
        const gestureSign = flipDir.get();
        return `rotateX(${dir * gestureSign * d}deg)`;
      }),
    }),
    [flipDeg, flipDir, dir]
  );

  return [style, lang] as const;
}
