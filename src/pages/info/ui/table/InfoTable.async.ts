import { lazy } from 'react';

const InfoTableAsync = lazy(() => import('./InfoTable'));

export { InfoTableAsync as InfoTable };
