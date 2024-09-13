import { useGetFilter } from '@/entities/main/model/selectors/mainSelectors';
import { useMainActions } from '@/entities/main/model/slice/mainSlice';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { RadioChangeEvent, Radio } from 'antd';

export const MainHead = () => {
    const filter = useGetFilter();
    const { setFilter } = useMainActions();

    const handleSizeChange = (e: RadioChangeEvent) => {
        setFilter(e.target.value);
    };

    return (
        <FlexBox cls="flex flex-row justify-between items-center w-full">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 md:mb-0 text-center">
                Главная
            </h1>

            <Radio.Group
                className="flex items-center justify-center"
                value={filter || 'day'}
                onChange={handleSizeChange}
            >
                <Radio.Button value="day">день</Radio.Button>
                <Radio.Button value="week">неделя</Radio.Button>
                <Radio.Button value="month">месяц</Radio.Button>
            </Radio.Group>
        </FlexBox>
    );
};
