import React, { useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import Icon from './Icon';
import icons from '../config/iconExps';
import { opacityFromSpringX } from '../utils/iconSpringOpacity';

interface ExpsProps {
  toggle: boolean;
}

/** Temps pour laisser finir le stagger + ressorts avant démontage. */
const CLOSE_UNMOUNT_MS = 1600;
const STAGGER_MS = 48;
/** Délai après la barre (ouverture). */
const OPEN_LEAD_MS = 210;
/** Pas entre logos en grille (64px + marge) — sert à les empiler sur la 1re colonne. */
const ICON_CELL_PX = 72;
/** Décalage commun depuis la gauche avant empilement (hors cadre). */
const STACK_ENTRY_PX = 150;

/** Toutes les icônes sur la même colonne que le 1er logo (alignées à gauche), prêtes à se ranger. */
function stackedLeftX(i: number): number {
  return -STACK_ENTRY_PX - i * ICON_CELL_PX;
}

const Exps = ({ toggle }: ExpsProps) => {
  const n = icons.length;
  const [expsSprings] = useSprings(
    n,
    (i) => ({
      from: { x: stackedLeftX(i) },
      to: { x: toggle ? 0 : stackedLeftX(i) },
      config: { tension: 305, friction: 19, mass: 0.58 },
      delay:
        (toggle ? i : n - 1 - i) * STAGGER_MS + (toggle ? OPEN_LEAD_MS : 0),
    }),
    [toggle]
  );

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (toggle && !display) {
      setDisplay(true);
    }
    if (!toggle && display) {
      const t = setTimeout(() => {
        setDisplay(false);
      }, CLOSE_UNMOUNT_MS);
      return () => clearTimeout(t);
    }
  }, [display, toggle]);

  return (
    <div className="relative left-[45px] top-[10px] flex min-h-[180px] w-[600px] flex-row flex-wrap items-center justify-start overflow-x-hidden overflow-y-visible p-[5px] max-[750px]:left-0 max-[750px]:top-5 max-[750px]:min-h-[240px] max-[750px]:w-[280px] max-[750px]:flex-wrap max-[750px]:justify-start">
      {display &&
        expsSprings.map((styles, index) => (
          <animated.div
            key={index}
            style={{
              transform: styles.x.to((x: number) => `translateX(${x}px)`),
              opacity: styles.x.to((x: number) =>
                opacityFromSpringX(x, stackedLeftX(index), toggle)
              ),
              willChange: 'transform, opacity',
              zIndex: n - index,
            }}
          >
            <Icon
              name={icons[index].name}
              title={icons[index].title}
              url={icons[index].url}
              background={false}
            />
          </animated.div>
        ))}
    </div>
  );
};

export default Exps;
