/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfoActions } from '@/entities/info/model/slice/infoSlice';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { Button, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

export const InfoHead = () => {
    const navigate = useNavigate();
    const { setDateMonthInfo } = useInfoActions();

    const onChange = (_: any, dateString: string | string[]) => {
        if (Array.isArray(dateString)) {
            setDateMonthInfo(dateString.join(', '));
        } else {
            setDateMonthInfo(dateString);
        }
    };

    return (
        <FlexBox cls="justify-between items-center flex-wrap gap-4">
            <Button onClick={() => navigate(-1)} type="primary" className="mb-2 sm:mb-0">
                Назад
            </Button>
            <FlexBox cls="flex-grow justify-center sm:justify-end">
                <DatePicker
                    allowClear={false}
                    picker="month"
                    onChange={onChange}
                    placeholder="Выберите месяц"
                    style={{ width: '100%', maxWidth: '200px' }}
                    className="w-full sm:w-auto"
                />
            </FlexBox>
        </FlexBox>
    );
};
