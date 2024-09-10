import { buildSelector } from '@/shared/lib/store';

export const [useGetInfoDateMonth, dateMonth] = buildSelector(
    (state) => state.info.month,
);
export const [useGetInfoLimit, limit] = buildSelector(
    (state) => state.info.limit,
);
export const [useGetInfoPage, page] = buildSelector((state) => state.info.page);