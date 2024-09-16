import { useInfoActions } from '@/entities/info/model/slice/infoSlice';
import { getDefaultDateMonth } from '@/shared/lib/defaultDate/defaultDate';
import { Button, DatePicker } from '@/shared/ui';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';

const InfoHead = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setDateMonthInfo } = useInfoActions();

    const onChange = (_: any, dateString: string | string[]) => {
        if (Array.isArray(dateString)) {
            setDateMonthInfo(dateString.join(', '));
        } else {
            setDateMonthInfo(dateString);
        }
    };

    const month = getDefaultDateMonth();

    const downloadFile = () => {
        const url = `https://bazar-api.aralhub.uz/export-data/car?date=${month}&car_number=${id}`;
        window.location.href = url;
    };
    return (
        <FlexBox cls="justify-between">
            <Button onClick={() => navigate(-1)} type="primary">
                Назад
            </Button>
            <FlexBox>
                <Button onClick={downloadFile}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    скачать
                </Button>
                <DatePicker
                    allowClear={false}
                    picker="month"
                    onChange={onChange}
                    placeholder="Месяц"
                    style={{ width: 100 }}
                />
            </FlexBox>
        </FlexBox>
    );
};

export default InfoHead;
