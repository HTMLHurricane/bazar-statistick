import { rtkApi } from '@/shared/api/rtkApi';
import { UnknownResponse } from '../model/types/unknownTypes';
import { IParams } from '@/shared/types/types';

const unknownApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUnknownCars: build.query<UnknownResponse, IParams>({
            query: (params) => ({
                cacheTime: 60000,
                refetchOnMountOrArgChange: true,
                refetchOnFocus: true,
                refetchOnReconnect: true,
                url: 'unknown-car/',
                params: {
                    car_date: params.date,
                    limit: params.limit,
                    page: params.page,
                },
            }),
        }),
    }),
});

export const useGetUnknownCars = unknownApi.useGetUnknownCarsQuery;
