import { useHistoryActions } from '@/entities/history/model/slice/historySlice';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { DatePicker, DatePickerProps } from 'antd';

export const HistoryHeader = () => {
    const { setDateMonth } = useHistoryActions();
    const onChangeMonth: DatePickerProps['onChange'] = (
        _,
        dateString: string | string[],
    ) => {
        if (typeof dateString === 'string') {
            setDateMonth(dateString);
        }
    };

    return (
        <FlexBox cls="flex flex md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-xl sm:text-3xl font-medium text-center md:text-left">
                История за месяц
            </h1>
            <FlexBox cls="justify-center md:justify-end w-full md:w-auto">
                <DatePicker
                    allowClear={false}
                    placeholder="Выберите месяц"
                    onChange={onChangeMonth}
                    picker="month"
                    style={{ width: '100%', maxWidth: '200px' }}
                    className="w-full sm:w-auto"
                />
            </FlexBox>
        </FlexBox>
    );
};
