/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { rtkApi } from '@/shared/api/rtkApi';
import { mainReducer } from '@/entities/main/model/slice/mainSlice';
import { historyReducer } from '@/entities/history/model/slice/historySlice';
import { infoReducer } from '@/entities/info/model/slice/infoSlice';
import { unknownReducer } from '@/entities/unknown/model/slice/unknownSlice';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        main: mainReducer,
        history: historyReducer,
        info: infoReducer,
        unknown: unknownReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({}).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
