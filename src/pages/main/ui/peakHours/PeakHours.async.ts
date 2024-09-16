import { lazy } from 'react';

const PeakHoursAsync = lazy(() => import('./PeakHours'));

export { PeakHoursAsync as PeakHours };
