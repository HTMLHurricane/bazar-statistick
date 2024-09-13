import { useUnknownActions } from '@/entities/unknown/model/slice/unknownSlice';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { DatePickerProps, DatePicker, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const UnknownHeader = () => {
    const navigate = useNavigate();
    const { setDate } = useUnknownActions();
    const onChange: DatePickerProps['onChange'] = (
        _,
        dateString: string | string[],
    ) => {
        if (typeof dateString === 'string') {
            setDate(dateString);
        }
    };
    const onChangeMonth: DatePickerProps['onChange'] = (
        _,
        dateString: string | string[],
    ) => {
        if (typeof dateString === 'string') {
            setDate(dateString);
        }
    };
    return (
        <FlexBox cls="flex flex md:flex-row justify-between items-center mb-8 gap-4">
            <Button onClick={() => navigate(-1)} type="primary">
                Назад
            </Button>
            <FlexBox cls="justify-center md:justify-end w-full md:w-auto">
                <DatePicker
                    allowClear={false}
                    placeholder="Месяц"
                    onChange={onChangeMonth}
                    picker="month"
                    style={{ width: '100%', maxWidth: '100px' }}
                    className="w-full sm:w-auto"
                />
                <DatePicker
                    allowClear={false}
                    placeholder="день"
                    onChange={onChange}
                    picker="date"
                    style={{ width: '100%', maxWidth: '100px' }}
                    className="w-full sm:w-auto"
                />
            </FlexBox>
        </FlexBox>
    );
};
