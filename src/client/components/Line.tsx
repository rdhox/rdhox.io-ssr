import React from 'react';
import styled from 'styled-components';

interface LineProps {
  length?: number;
  thickness?: number;
  color?: string;
  radius?: number;
  angle?: number;
}

const Line = ({
  length: _length = 100,
  thickness: _thickness = 3,
  color = 'black',
  radius = 2,
  angle = 0,
}: LineProps) => (
  <Container color={color} radius={radius} angle={angle} />
);

const Container = styled.div<{
  color: string;
  radius: number;
  angle: number;
}>`
  width: 130px;
  height: 5px;
  background-color: ${({ color }) => color};
  border-radius: ${({ radius }) => `${radius}px`};
  transform: ${({ angle: a }) => `rotateZ(${a}deg)`};
  transform-origin: bottom right;

  @media (max-width: 750px) {
    width: 80px;
    height: 3px;
  }
`;

export default Line;
