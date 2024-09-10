import { IFilter } from '@/entities/main/model/types/mainType';
import { Card } from 'antd';

interface CarStatisticsDoughnutChartProps {
    count: number | undefined;
    filter: IFilter;
}

const CarStatisticsDoughnutChart = ({
    count,
    filter,
}: CarStatisticsDoughnutChartProps) => {
    return (
        <Card
            title={`Всего машин за ${
                filter === 'day'
                    ? 'день'
                    : filter === 'week'
                    ? 'неделю'
                    : 'месяц'
            }`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full md:w-3/4 lg:w-1/3"
        >
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center py-6 md:py-8 lg:py-12 xl:py-16">
                {count ? count : 0}
            </div>
        </Card>
    );
};

export default CarStatisticsDoughnutChart;
