import { lazy } from 'react';

const DontPayAsync = lazy(() => import('./DontPay'));

export { DontPayAsync as DontPay };
