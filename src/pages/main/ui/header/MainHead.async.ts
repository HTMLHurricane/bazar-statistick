import { lazy } from 'react';

const MainHeadAsync = lazy(() => import('./MainHead'));

export { MainHeadAsync as MainHead };
