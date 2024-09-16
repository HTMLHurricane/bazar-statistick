import { lazy } from 'react';

const HistoryAsync = lazy(() => import('./History'));

export { HistoryAsync as History };
