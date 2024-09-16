import { lazy } from 'react';

const HistoryTableAsync = lazy(() => import('./HistoryTable'));

export { HistoryTableAsync as HistoryTable };
