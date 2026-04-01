import React, { useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import Icon from './Icon';
import icons from '../config/iconContacts';
import { opacityFromSpringX } from '../utils/iconSpringOpacity';

interface ContactsProps {
  toggle: boolean;
}

const CLOSE_UNMOUNT_MS = 950;
const STAGGER_MS = 48;
const OPEN_LEAD_MS = 210;
const ICON_CELL_PX = 72;
const STACK_ENTRY_PX = 150;

/** Empilées sur la colonne du dernier logo (entrée par la droite), même idée qu’Exps. */
function stackedRightX(n: number, i: number): number {
  return STACK_ENTRY_PX + (n - 1 - i) * ICON_CELL_PX;
}

const Contacts = ({ toggle }: ContactsProps) => {
  const n = icons.length;
  const [contactsSprings] = useSprings(
    n,
    (i) => ({
      from: { x: stackedRightX(n, i) },
      to: { x: toggle ? 0 : stackedRightX(n, i) },
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
  }, [toggle, display]);

  return (
    <div className="relative -right-[110px] top-0 flex h-[100px] w-[230px] items-center justify-between overflow-hidden p-[5px] max-[750px]:-right-10 max-[750px]:top-[-15px] max-[750px]:h-[50px] max-[750px]:w-[150px]">
      {display &&
        contactsSprings.map((styles, index) => (
          <animated.div
            key={index}
            style={{
              transform: styles.x.to((x: number) => `translateX(${x}px)`),
              opacity: styles.x.to((x: number) =>
                opacityFromSpringX(x, stackedRightX(n, index), toggle)
              ),
              willChange: 'transform, opacity',
              zIndex: n - index,
            }}
          >
            <Icon
              name={icons[index].name}
              title={icons[index].title}
              url={icons[index].url}
            />
          </animated.div>
        ))}
    </div>
  );
};

export default Contacts;
