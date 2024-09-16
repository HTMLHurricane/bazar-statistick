import { lazy } from 'react';

const HistoryByTopCarsAsync = lazy(() => import('./HistoryByTopCars'));

export { HistoryByTopCarsAsync as HistoryByTopCars };
