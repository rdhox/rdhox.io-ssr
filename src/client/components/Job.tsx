import React from 'react';
import { animated } from '@react-spring/web';
import { useToggleScroll } from '../customHooks';
import TextJob from './TextJob';
import SubTextJob from './SubTextJob';

interface JobProps {
  handleToggleExps: React.Dispatch<React.SetStateAction<boolean>>;
}

const Job = ({ handleToggleExps }: JobProps) => {
  const handleToggle = () => {
    handleToggleExps(t => !t);
  };

  const [toggleAnim, lang] = useToggleScroll(-1);
  const styleSub = { alignSelf: 'flex-end' as const };

  return (
    <div
      className="relative mt-[30px] cursor-pointer opacity-0 [perspective:350px] animate-job-slide"
      onClick={handleToggle}
    >
      <animated.div style={toggleAnim}>
        <div className="flex flex-col items-start justify-center">
          <TextJob lang={lang} bold spacing={1} children="job" />
          <div className="relative animate-subjob-slide opacity-0">
            <SubTextJob
              style={styleSub}
              lang={lang}
              spacing={1}
              italic
              color="grey"
              children="subJob"
            />
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Job;
