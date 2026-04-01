import React from 'react';
import styled from 'styled-components';
import lg, { LangStringKey } from '../config/lang';
import type { Lang } from '../customHooks/toggleScroll';

interface SubTextJobProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: LangStringKey;
  lang?: Lang;
  color?: string;
  italic?: boolean;
  bold?: boolean;
  spacing?: number | string;
}

const SubTextJob = ({
  children,
  lang = 'fr',
  color = 'black',
  italic = false,
  bold = false,
  spacing = 'normal',
  ...rest
}: SubTextJobProps) => {
  return (
    <Container
      color={color}
      italic={italic}
      bold={bold}
      spacing={spacing}
      {...rest}
    >
      {lg[lang][children]}
    </Container>
  );
};

const Container = styled.span<{
  color?: string;
  italic?: boolean;
  bold?: boolean;
  spacing?: number | string;
}>`
  font-size: 24px;
  color: ${({ color }) => color};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  letter-spacing: ${({ spacing }) =>
    typeof spacing === 'number' ? `${spacing}px` : spacing};

  @media (max-width: 750px) {
    font-size: 14px;
  }
`;

export default SubTextJob;
