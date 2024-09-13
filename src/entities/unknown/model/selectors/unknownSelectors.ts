import { buildSelector } from '@/shared/lib/store';

export const [useGetUnknownLimit, limit] = buildSelector(
    (state) => state.unknown.limit,
);
export const [useGetUnknownPage, page] = buildSelector(
    (state) => state.unknown.page,
);
export const [useGetUnknownDate, date] = buildSelector(
    (state) => state.unknown.date,
);