import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN } from '@/shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://bazar-api.aralhub.uz/',
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
``