import { faCar, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';

interface CarStatisticsDoughnutChartProps {
    count: number | undefined;
    title: string;
    flag: 'car' | 'cars';
}

const CarStatisticsDoughnutChart = ({
    count,
    title,
    flag,
}: CarStatisticsDoughnutChartProps) => {
    const [prevCount, setPrevCount] = useState<number>(0);

    useEffect(() => {
        if (count !== undefined) {
            setPrevCount(count);
        }
    }, [count]);

    return (
        <Card
            title={
                <div className="flex jusbe items-center">
                    {title}{' '}
                    <span className="pl-2">
                        {flag === 'cars' ? (
                            <>
                                <FontAwesomeIcon icon={faRepeat} />
                                <FontAwesomeIcon
                                    icon={faCar}
                                    className="text-xl text-blue-500 pl-2"
                                />
                            </>
                        ) : (
                            <FontAwesomeIcon
                                icon={faCar}
                                className="text-xl text-blue-500"
                            />
                        )}
                    </span>
                </div>
            }
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full md:w-3/4 lg:w-full"
        >
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center py-6 md:py-8 lg:py-12 xl:py-16">
                <CountUp
                    start={prevCount}
                    end={count ? count : 0}
                    duration={3}
                    useEasing={true}
                    separator=","
                />
            </div>
        </Card>
    );
};

export default CarStatisticsDoughnutChart;
