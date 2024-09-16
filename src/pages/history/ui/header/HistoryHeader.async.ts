import { lazy } from 'react';

const HistoryHeaderAsync = lazy(() => import('./HistoryHeader'));

export { HistoryHeaderAsync as HistoryHeader };
