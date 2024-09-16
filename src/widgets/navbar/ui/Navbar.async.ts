import { lazy } from 'react';

const NavbarAsync = lazy(() => import('./Navbar'));

export { NavbarAsync as Navbar };
