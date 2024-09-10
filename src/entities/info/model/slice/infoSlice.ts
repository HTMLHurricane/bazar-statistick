import { buildSlice } from '@/shared/lib/store';
import { InfoSchema } from '../..';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: InfoSchema = {
    month: null,
    limit: 10,
    page: 1,
};

const infoSlice = buildSlice({
    name: 'info',
    initialState,
    reducers: {
        setDateMonthInfo(state, actions: PayloadAction<string | null>) {
            state.month = actions.payload;
        },
        setLimit(state, actions: PayloadAction<number>) {
            state.limit = actions.payload;
        },
        setPage(state, actions: PayloadAction<number>) {
            state.page = actions.payload;
        }
    },
});

export const {
    actions: infoActions,
    reducer: infoReducer,
    useActions: useInfoActions,
} = infoSlice;
