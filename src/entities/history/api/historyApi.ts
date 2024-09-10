import { rtkApi } from '@/shared/api/rtkApi';
import { HistoryDataResponse } from '../model/types/historyType';

const historyApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getHistoryData: build.query<HistoryDataResponse[], { date: string }>({
            query: ({ date }) => ({
                url: `daily-report/?date=${date}`,
                method: 'GET',
            }),
        }),
        getHistoryDay: build.query<HistoryDataResponse, { date: string }>({
            query: ({ date }) => ({
                url: `daily-report/?date=${date}`,
                method: 'GET',
            }),
        }),
    }),
});

export const useGetHistoryData = historyApi.useGetHistoryDataQuery;
export const useGetHistoryDay = historyApi.useGetHistoryDayQuery;