import { LoginForm } from '@/features/auth';
import { History } from '@/pages/history';
import { HistoryByDay } from '@/pages/historyByDay';
import { Info } from '@/pages/info';
import { InfoByDate } from '@/pages/infoByDate';
import { MainPage } from '@/pages/main';
import { NotFoundPage } from '@/pages/notFoundPage/ui';
import { Unknown } from '@/pages/unknown';
import { AppRoutesProps } from '@/shared/types/router';
import { Spin } from 'antd';
import { Suspense } from 'react';

export enum AppRoutes {
    MAIN = 'main',
    INFO = 'info',
    INFOBYDATE = 'info_date',
    HISTORY = 'history',
    HISTORYBYDAY = 'history_by_day',
    LOGIN = 'login',
    UNKNOWN = 'unknown',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.INFO]: '/',
    [AppRoutes.INFOBYDATE]: '/:id/',
    [AppRoutes.HISTORY]: '/history',
    [AppRoutes.HISTORYBYDAY]: '/history/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.UNKNOWN]: '/unknown',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: (
            <Suspense
                fallback={
                    <Spin className="flex justify-center items-center w-full h-screen" />
                }
            >
                <MainPage />{' '}
            </Suspense>
        ),
        text: 'Главная',
        authOnly: true,
    },
    [AppRoutes.INFO]: {
        path: `${RoutePath.info}:id`,
        element: (
            <Suspense
                fallback={
                    <Spin className="flex justify-center items-center w-full h-screen" />
                }
            >
                <Info />{' '}
            </Suspense>
        ),
        authOnly: true,
    },
    [AppRoutes.INFOBYDATE]: {
        path: `${RoutePath.info_date}:date`,
        element: (
            <Suspense
                fallback={
                    <Spin className="flex justify-center items-center w-full h-screen" />
                }
            >
                <InfoByDate />
            </Suspense>
        ),
        authOnly: true,
    },
    [AppRoutes.HISTORY]: {
        path: RoutePath.history,
        element: (
            <Suspense
                fallback={
                    <Spin className="flex justify-center items-center w-full h-screen" />
                }
            >
                <History />
            </Suspense>
        ),
        text: 'История',
        authOnly: true,
    },
    [AppRoutes.HISTORYBYDAY]: {
        path: `${RoutePath.history_by_day}:dateDay`,
        element: (
            <Suspense
                fallback={
                    <Spin className="flex justify-center items-center w-full h-screen" />
                }
            >
                <HistoryByDay />
            </Suspense>
        ),
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: (
            <Suspense
                fallback={
                    <Spin className="flex justify-center items-center w-full h-screen" />
                }
            >
                <LoginForm />
            </Suspense>
        ),
    },
    [AppRoutes.UNKNOWN]: {
        path: RoutePath.unknown,
        element: <Unknown />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
