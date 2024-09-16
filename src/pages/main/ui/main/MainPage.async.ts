import { lazy } from 'react';

const MainPageAsync = lazy(() => import('./Main'));

export { MainPageAsync as MainPage };
