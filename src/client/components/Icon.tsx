import React from 'react';
import Picto, { type PictoName } from './Picto';

interface IconProps {
  name: PictoName;
  title?: string;
  url?: string;
  background?: boolean;
}

const Icon = ({
  name,
  url = '',
  title = '',
  background = true,
}: IconProps) => {
  const boxClass = background
    ? 'bg-[#EEEEEE] hover:bg-[#EDE7F6]'
    : 'bg-transparent hover:bg-transparent';

  return (
    <div
      className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-[10px] m-0 max-[750px]:m-[5px] max-[750px]:h-10 max-[750px]:w-10 ${boxClass}`}
    >
      {url !== '' ? (
        <a href={url} title={title}>
          <Picto icon={name} />
        </a>
      ) : (
        <Picto icon={name} />
      )}
    </div>
  );
};

export default Icon;
