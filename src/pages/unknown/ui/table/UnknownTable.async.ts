import { lazy } from 'react';

const UnknownTableAsync = lazy(() => import('./UnknownTable'));

export { UnknownTableAsync as UnknownTable };
