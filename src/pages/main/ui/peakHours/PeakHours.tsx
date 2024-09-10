import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import Card from 'antd/es/card/Card';
import { GraphicData, IFilter } from '@/entities/main';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

interface PeakHoursProps {
    data: GraphicData[] | undefined;
    filter: IFilter;
}

const PeakHours = ({ data, filter }: PeakHoursProps) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `Количество машин: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                    stepSize: 1,
                },
            },
            x: {
                title: {
                    display: true,
                    text: filter === 'day' ? 'Время' : filter === 'week' ? 'День недели' : 'Дата',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10, // Adjust as needed to prevent overcrowding
                },
            },
        },
    };

    const dataSet = {
        labels: data?.map((item) =>
            filter === 'day'
                ? item.time
                : filter === 'week'
                ? item.weekday
                : item.day,
        ),
        datasets: [
            {
                label: 'Количество машин',
                data: data?.map((item) => item.count),
                borderColor:
                    filter === 'day'
                        ? 'rgba(75, 192, 192, 1)'
                        : filter === 'week'
                        ? 'rgba(153, 102, 255, 1)'
                        : 'rgba(255, 159, 64, 1)',
                backgroundColor:
                    filter === 'day'
                        ? 'rgba(75, 192, 192, 0.2)'
                        : filter === 'week'
                        ? 'rgba(153, 102, 255, 0.2)'
                        : 'rgba(255, 159, 64, 0.2)',
                fill: true,
                lineTension: 0.3, // Slight curve for better visual appeal
            },
        ],
    };

    return (
        <Card
            title={`Пиковое время за ${
                filter === 'day'
                    ? 'день'
                    : filter === 'week'
                    ? 'неделю'
                    : 'месяц'
            }`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full max-w-4xl"
        >
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center">
                <Line data={dataSet} options={options} />
            </div>
        </Card>
    );
};

export default PeakHours;
