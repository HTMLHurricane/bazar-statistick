import { lazy } from 'react';

const LastAsync = lazy(() => import('./Last'));

export { LastAsync as Last };
