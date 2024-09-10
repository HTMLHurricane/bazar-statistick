import { LoginForm } from '@/features/auth';
import { History } from '@/pages/history';
import { HistoryByDay } from '@/pages/historyByDay';
import { Info } from '@/pages/info/ui/info/Info';
import { InfoByDate } from '@/pages/infoByDate';
import { MainPage } from '@/pages/main';
import { NotFoundPage } from '@/pages/notFoundPage/ui';
import { AppRoutesProps } from '@/shared/types/router';

export enum AppRoutes {
    MAIN = 'main',
    INFO = 'info',
    INFOBYDATE = 'info_date',
    HISTORY = 'history',
    HISTORYBYDAY = 'history_by_day',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.INFO]: '/',
    [AppRoutes.INFOBYDATE]: '/:id/',
    [AppRoutes.HISTORY]: '/history',
    [AppRoutes.HISTORYBYDAY]: '/history/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        text: 'Главная',
        authOnly: true,
    },
    [AppRoutes.INFO]: {
        path: `${RoutePath.info}:id`,
        element: <Info />,
        authOnly: true,
    },
    [AppRoutes.INFOBYDATE]: {
        path: `${RoutePath.info_date}:date`,
        element: <InfoByDate />,
        authOnly: true,
    },
    [AppRoutes.HISTORY]: {
        path: RoutePath.history,
        element: <History />,
        text: 'История',
        authOnly: true,
    },
    [AppRoutes.HISTORYBYDAY]: {
        path: `${RoutePath.history_by_day}:dateDay`,
        element: <HistoryByDay />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginForm />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
