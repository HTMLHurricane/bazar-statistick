import { rtkApi } from '@/shared/api/rtkApi';
import {
    WorkGraphicResponse,
    WorkingGraphicForm,
} from '../model/types/workGraphicTypes';

const workGraphicApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getWorkingGraphic: build.query<WorkGraphicResponse, void>({
            query: () => ({
                url: 'start_end_time/',
                method: 'GET',
            }),
        }),
        createWorkingGraphic: build.mutation<unknown, WorkingGraphicForm>({
            query: (body) => ({
                url: `start_end_time/?start_time=${body.start_time}&end_time=${body.end_time}`,
                method: 'POST',
            }),
        }),
        updateWorkingGraphic: build.mutation<unknown, WorkingGraphicForm>({
            query: (body) => ({
                url: `start_end_time/?start_time=${body.start_time}&end_time=${body.end_time}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const useGetWorkingGraphic = workGraphicApi.useGetWorkingGraphicQuery;
export const createWorkingGraphic =
    workGraphicApi.useCreateWorkingGraphicMutation;
export const updateWorkingGraphic =
    workGraphicApi.useUpdateWorkingGraphicMutation;
