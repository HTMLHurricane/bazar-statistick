import { Card } from 'antd';

interface CarStatisticsDoughnutChartProps {
    count: number | undefined;
    date: string | null;
    dateMonth: string | null;
}

const HistoryCount = ({
    count,
    date,
    dateMonth,
}: CarStatisticsDoughnutChartProps) => {
    return (
        <Card
            title={`Количество машин за ${date || dateMonth}`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 w-[30%] mt-8"
        >
            <div className="text-9xl text-center py-[134px]">
                {count ? count : 0}
            </div>
        </Card>
    );
};

export default HistoryCount;
