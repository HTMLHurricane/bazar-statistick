import { buildSlice } from '@/shared/lib/store';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { HistorySchema } from '../types/historyType'

const initialState: HistorySchema = {
    date: null,
    dateMonth: null,
};

const historySlice = buildSlice({
    name: 'history',
    initialState,
    reducers: {
        setDate(state, actions: PayloadAction<string | null>) {
            state.date = actions.payload;
        },
        setDateMonth(state, actions: PayloadAction<string | null>) {
            state.dateMonth = actions.payload;
        },
    },
});

export const {
    actions: historyActions,
    reducer: historyReducer,
    useActions: useHistoryActions,
} = historySlice;
