import { buildSelector } from '@/shared/lib/store';

export const [useGetDate, date] = buildSelector((state) => state.history.date);
export const [useGetDateMonth, dateMonth] = buildSelector(
    (state) => state.history.dateMonth,
);
