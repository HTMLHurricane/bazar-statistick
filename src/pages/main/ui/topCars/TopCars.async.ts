import { lazy } from 'react';

const TopCarsAsync = lazy(() => import('./TopCars'));

export { TopCarsAsync as TopCars };
