import { lazy } from 'react';

const UnknownAsync = lazy(() => import('./Unknown'));

export { UnknownAsync as Unknown };
