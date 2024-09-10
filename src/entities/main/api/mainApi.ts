import { rtkApi } from '@/shared/api/rtkApi';
import { IParams } from '@/shared/types/types';
import { AttendanceResponse } from '..';

const mainApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getCarDay: build.query<AttendanceResponse, IParams>({
            query: (params) => ({
                url: 'car/day',
                method: 'GET',
                params: {
                    limit: params.limit,
                    page: params.page,
                },
            }),
        }),
        getCarWeek: build.query<AttendanceResponse, IParams>({
            query: (params) => ({
                url: 'car/week',
                method: 'GET',
                params: {
                    limit: params.limit,
                    page: params.page,
                },
            }),
        }),
        getCarMonth: build.query<AttendanceResponse, IParams>({
            query: (params) => ({
                url: 'car/month',
                method: 'GET',
                params: {
                    limit: params.limit,
                    page: params.page,
                },
            }),
        }),
    }),
});

export const useGetCarDay = mainApi.useGetCarDayQuery;
export const useGetCarWeek = mainApi.useGetCarWeekQuery;
export const useGetCarMonth = mainApi.useGetCarMonthQuery;
