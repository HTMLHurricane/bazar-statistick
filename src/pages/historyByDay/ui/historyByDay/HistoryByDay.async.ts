import { lazy } from 'react';

const HistoryByDayAsync = lazy(() => import('./HistoryByDay'));

export { HistoryByDayAsync as HistoryByDay };
