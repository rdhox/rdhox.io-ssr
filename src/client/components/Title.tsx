import React from 'react';
import { animated } from '@react-spring/web';
import { useToggleScroll } from '../customHooks';
import TextTitle from './TextTitle';
import SubTextTitle from './SubTextTitle';

interface TitleProps {
  handleToggleContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const Title = ({ handleToggleContact }: TitleProps) => {
  const handleToggle = () => {
    handleToggleContact(t => !t);
  };

  const [toggleAnim, lang] = useToggleScroll();
  const styleSub = { alignSelf: 'flex-start' as const };
  return (
    <div
      className="relative mb-[30px] w-[480px] cursor-pointer select-none opacity-0 [perspective:350px] animate-title-slide max-[750px]:w-[230px]"
      onClick={handleToggle}
    >
      <animated.div
        className="[backface-visibility:hidden] [transform-style:preserve-3d]"
        style={toggleAnim}
      >
        <div className="flex flex-col items-end justify-center">
          <TextTitle lang={lang} bold spacing={1} children="blaz" />
          <div className="relative animate-subtitle-slide opacity-0">
            <SubTextTitle
              style={styleSub}
              lang={lang}
              spacing={1}
              italic
              color="grey"
              children="name"
            />
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Title;
