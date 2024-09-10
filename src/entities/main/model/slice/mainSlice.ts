import { buildSlice } from '@/shared/lib/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { IFilter, MainShema } from '../types/mainType';

const initialState: MainShema = {
    filter: 'day',
    limit: 10,
    page: 1,
    isModalVisible: false,
};

const mainSlice = buildSlice({
    name: 'main',
    initialState,
    reducers: {
        setFilter(state, actions: PayloadAction<IFilter>) {
            state.filter = actions.payload;
        },
        setLimit(state, actions: PayloadAction<number>) {
            state.limit = actions.payload;
        },
        setPage(state, actions: PayloadAction<number>) {
            state.page = actions.payload;
        },
        setIsModalVisible(state, actions: PayloadAction<boolean>) {
            state.isModalVisible = actions.payload;
        },
    },
});

export const {
    actions: mainActions,
    reducer: mainReducer,
    useActions: useMainActions,
} = mainSlice;
