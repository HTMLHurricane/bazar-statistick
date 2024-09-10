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
        <FlexBox cls="justify-between">
            <Button onClick={() => navigate(-1)} type="primary">
                Назад
            </Button>
            <FlexBox>
                <DatePicker
                    allowClear={false}
                    picker="month"
                    onChange={onChange}
                    placeholder="Выберите месяц"
                    style={{ width: 200 }}
                />
            </FlexBox>
        </FlexBox>
    );
};
