/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN } from '@/shared/const/localstorage';

const parseServerTiming = (serverTimingHeader: string) => {
    const metrics = serverTimingHeader.split(',').map((metric) => metric.trim());
    console.log('Parsed Server-Timing:', metrics);
};

const baseQueryWithServerTiming = async (args: any, api: any, extraOptions: any) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: 'https://bazar-api.aralhub.uz/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(TOKEN) || '';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result?.meta?.response) {
        const serverTimingHeader = result.meta.response.headers.get('Server-Timing');
        if (serverTimingHeader) {
            console.log('Server-Timing:', serverTimingHeader);
            parseServerTiming(serverTimingHeader);
        }
    }

    return result;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithServerTiming,
    tagTypes: ['car'],
    endpoints: () => ({}),
});
