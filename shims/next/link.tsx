import React from 'react';

export default function Link({ href, children, ...props }: any) {
  const url = typeof href === 'object' ? href.pathname : href;
  return (
    <a href={url} {...props}>
      {children}
    </a>
  );
}
