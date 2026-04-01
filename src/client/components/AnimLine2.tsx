import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useMediaQuery } from 'react-responsive';
import Line from './Line';

interface AnimLine2Props {
  toggle: boolean;
}

const AnimLine2 = ({ toggle }: AnimLine2Props) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const angle = isTabletOrMobile ? 'rotateZ(-10deg)' : 'rotateZ(-30deg)';

  const angleAnim = useSpring({
    from: {
      transform: 'rotateZ(0deg)',
      transformOrigin: 'bottom right',
    },
    to: {
      transform: toggle ? angle : 'rotateZ(0deg)',
      transformOrigin: 'bottom right',
    },
    config: config.stiff,
  });

  return (
    <div className="relative -left-[400px] origin-bottom-right opacity-0 animate-line2-desk max-[750px]:-left-[200px] max-[750px]:animate-line2-mobile">
      <animated.div style={angleAnim}>
        <Line angle={-90} />
      </animated.div>
    </div>
  );
};

export default AnimLine2;
