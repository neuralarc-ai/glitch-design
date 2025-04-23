
import React from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  glitchEffect?: 'light' | 'heavy' | 'none';
}

const GlitchText = ({ 
  text, 
  className, 
  element = 'h2',
  glitchEffect = 'light'
}: GlitchTextProps) => {
  const Tag = element;
  
  if (glitchEffect === 'none') {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag 
      className={cn(
        "heading-glitch font-bold", 
        glitchEffect === 'heavy' && "animate-glitch-flash",
        className
      )} 
      data-text={text}
    >
      {text}
    </Tag>
  );
};

export default GlitchText;
