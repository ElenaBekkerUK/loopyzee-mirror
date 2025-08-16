// loopyzee/src/app/categories/[id]/page.css.ts
// Vanilla Extract styles for CategoryTemplatesPage layout and grid

import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem 1rem',
  maxWidth: 1200,
  margin: '0 auto',
});

export const heading = style({
  fontSize: '2rem',
  fontWeight: 600,
  textAlign: 'center',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '1.5rem',
  '@container': {
    'inline-size < 600px': {
      gridTemplateColumns: '1fr',
    },
    'inline-size >= 600px and < 900px': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'inline-size >= 900px': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    },
  },
});
