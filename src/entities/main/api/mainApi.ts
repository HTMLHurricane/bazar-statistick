import { rtkApi } from '@/shared/api/rtkApi';
import { IParams } from '@/shared/types/types';
import { AllCars, AttendanceResponse } from '..';

const mainApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getCarDay: build.query<AttendanceResponse, IParams>({
            query: (params) => ({
                cacheTime: 60000,
                refetchOnMountOrArgChange: true,
                refetchOnFocus: true,
                refetchOnReconnect: true,
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
                cacheTime: 60000,
                refetchOnMountOrArgChange: true,
                refetchOnFocus: true,
                refetchOnReconnect: true,
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
                cacheTime: 60000,
                refetchOnMountOrArgChange: true,
                refetchOnFocus: true,
                refetchOnReconnect: true,
                url: 'car/month',
                method: 'GET',
                params: {
                    limit: params.limit,
                    page: params.page,
                },
            }),
        }),
        getAllCars: build.query<AllCars[], void>({
            query: () => ({
                url: 'exception-nums/search',
                method: 'GET',
            }),
        }),
    }),
});

export const useGetCarDay = mainApi.useGetCarDayQuery;
export const useGetCarWeek = mainApi.useGetCarWeekQuery;
export const useGetCarMonth = mainApi.useGetCarMonthQuery;
export const useGetAllCars = mainApi.useGetAllCarsQuery;
