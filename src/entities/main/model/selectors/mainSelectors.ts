import { buildSelector } from '@/shared/lib/store';

export const [useGetFilter, mainFilter] = buildSelector(
    (state) => state.main.filter,
);
export const [useGetLimit, limit] = buildSelector((state) => state.main.limit);
export const [useGetPage, page] = buildSelector((state) => state.main.page);
export const [useGetIsModalVisible, isModalVisible] = buildSelector(
    (state) => state.main.isModalVisible,
);
