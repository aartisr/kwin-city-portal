import React from 'react';

export default function Image({ src, alt, width, height, ...props }: any) {
  const imgSrc = typeof src === 'object' ? src.src : src;
  return <img src={imgSrc} alt={alt || ''} width={width} height={height} {...props} />;
}
