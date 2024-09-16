import { lazy } from 'react';

const CountAsync = lazy(() => import('./Count'));

export {
    CountAsync as Count
}