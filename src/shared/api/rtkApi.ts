import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN } from '@/shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://37.140.216.89:1111/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(TOKEN) || '';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['car'],
    endpoints: () => ({}),
});
