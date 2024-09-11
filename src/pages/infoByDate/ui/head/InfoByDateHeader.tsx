import { FlexBox } from '@/shared/ui/box/FlexBox';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

export const InfoByDateHeader = () => {
    const {date} = useParams()
    const navigate = useNavigate();
    return (
        <FlexBox cls="justify-between pb-8">
            <Button onClick={() => navigate(-1)} type="primary">
                Назад
            </Button>
            <div className='font-medium'>
                <span className='pr-2'>Дата:</span>{date}
            </div>
        </FlexBox>
    );
};
