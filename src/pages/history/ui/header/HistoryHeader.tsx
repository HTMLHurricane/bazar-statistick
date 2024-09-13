import { useGetDateMonth } from '@/entities/history/model/selectors/historySelectors';
import { useHistoryActions } from '@/entities/history/model/slice/historySlice';
import { getDefaultDateMonth } from '@/shared/lib/defaultDate/defaultDate'
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, DatePickerProps } from 'antd';

export const HistoryHeader = () => {
    const { setDateMonth } = useHistoryActions();
    const dateMonth = useGetDateMonth();
    const selectedDate = dateMonth || getDefaultDateMonth();
    const onChangeMonth: DatePickerProps['onChange'] = (
        _,
        dateString: string | string[],
    ) => {
        if (typeof dateString === 'string') {
            setDateMonth(dateString);
        }
    };
    const downloadFile = () => {
        const url = `https://bazar-api.aralhub.uz/export-data/report/?date=${selectedDate}`;
        window.location.href = url;
    };

    return (
        <FlexBox cls="flex flex md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-xl sm:text-3xl font-medium text-center md:text-left hidden md:block">
                История за месяц
            </h1>
            <FlexBox cls="justify-center md:justify-end w-full md:w-auto">
                <Button onClick={downloadFile}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    скачать
                </Button>
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
