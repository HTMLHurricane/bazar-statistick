import { lazy } from 'react';

const UnknownHeaderAsync = lazy(() => import('./UnknownHeader'));

export { UnknownHeaderAsync as UnknownHeader };
