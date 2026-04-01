import React from 'react';
import lg, { LangStringKey } from '../config/lang';
import type { Lang } from '../customHooks/toggleScroll';

interface SubTextTitleProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: LangStringKey;
  lang?: Lang;
  color?: string;
  italic?: boolean;
  bold?: boolean;
  spacing?: number | string;
}

const SubTextTitle = ({
  children,
  lang = 'fr',
  color = 'black',
  italic = false,
  bold = false,
  spacing = 'normal',
  className,
  ...rest
}: SubTextTitleProps) => {
  return (
    <span
      className={`text-2xl max-[750px]:text-lg ${className ?? ''}`}
      style={{
        color,
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        letterSpacing:
          typeof spacing === 'number' ? `${spacing}px` : spacing,
      }}
      {...rest}
    >
      {lg[lang][children]}
    </span>
  );
};

export default SubTextTitle;
