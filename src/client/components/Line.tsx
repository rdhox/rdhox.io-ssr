import React from 'react';

interface LineProps {
  length?: number;
  thickness?: number;
  color?: string;
  radius?: number;
  angle?: number;
}

const Line = ({
  color = 'black',
  radius = 2,
  angle = 0,
}: LineProps) => (
  <div
    className="h-[5px] w-[130px] origin-bottom-right rounded-[2px] max-[750px]:h-[3px] max-[750px]:w-20"
    style={{
      backgroundColor: color,
      borderRadius: `${radius}px`,
      /* Calque GPU + arrière masqué : réduit le liseré gris (antialiasing) au bord des rotations composées. */
      backfaceVisibility: 'hidden',
      transform: `rotateZ(${angle}deg) translateZ(0)`,
    }}
  />
);

export default Line;
