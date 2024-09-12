import { FlexBox } from '@/shared/ui/box/FlexBox';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const HistoryByDayHeader = ({ date }: { date: string }) => {
    const navigate = useNavigate();
    const downloadFile = () => {
        const url = `https://bazar-api.aralhub.uz/export-data/report/?date=${date}`;
        window.location.href = url;
    };

    return (
        <>
            <FlexBox cls="flex flex md:flex-row justify-between items-center mb-4 gap-4">
                <h1 className="text-xl sm:text-3xl font-medium text-center md:text-left">
                    История за {date}
                </h1>
                <Button onClick={downloadFile}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    скачать
                </Button>
            </FlexBox>
            <Button onClick={() => navigate(-1)} type="primary">
                Назад
            </Button>
        </>
    );
};
