import { Navbar } from '@/widgets/navbar';
import { TopCars } from '../topCars/TopCars';
import PeakHours from '../peakHours/PeakHours';
import { Last } from '../last/Last';
import Count from '../count/Count';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import {
    useGetFilter,
    useGetLimit,
    useGetPage,
} from '@/entities/main/model/selectors/mainSelectors';
import {
    useGetCarDay,
    useGetCarMonth,
    useGetCarWeek,
} from '@/entities/main/api/mainApi';
import { useEffect, useState } from 'react';
import { AttendanceResponse } from '@/entities/main';
import { DontPay } from '../dontPay/DontPay';
import { MainHead } from '../head/MainHead';

export const MainPage = () => {
    const [data, setData] = useState<AttendanceResponse | undefined>(undefined);
    const limit = useGetLimit();
    const page = useGetPage();
    const filter = useGetFilter();
    const { data: carDayData } = useGetCarDay(
        { limit, page },
        {
            pollingInterval: 5000,
            refetchOnFocus: false,
        },
    );
    const { data: carWeekData } = useGetCarWeek(
        { limit, page },
        {
            pollingInterval: 5000,
            refetchOnFocus: false,
        },
    );
    const { data: carMonthData } = useGetCarMonth(
        { limit, page },
        {
            pollingInterval: 5000,
            refetchOnFocus: false,
        },
    );

    useEffect(() => {
        switch (filter) {
            case 'day':
                setData(carDayData);
                break;
            case 'week':
                setData(carWeekData);
                break;
            case 'month':
                setData(carMonthData);
                break;
            default:
                setData(undefined);
        }
    }, [filter, carDayData, carWeekData, carMonthData]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-10">
                <MainHead />
                <FlexBox cls="flex-col md:flex-row gap-4">
                    <div className="lg:w-1/3 lg:flex-col md:flex">
                        <Count
                            count={data?.general_count}
                            title={`Поток машин за ${
                                filter === 'day'
                                    ? 'день'
                                    : filter === 'week'
                                    ? 'неделю'
                                    : 'месяц'
                            }`}
                            flag='cars'
                        />
                        <Count
                            count={data?.total_cars}
                            title={`Количество машин за ${
                                filter === 'day'
                                    ? 'день'
                                    : filter === 'week'
                                    ? 'неделю'
                                    : 'месяц'
                            }`}
                            flag='car'
                        />
                    </div>

                    <Last
                        data={data?.general}
                        filter={filter}
                        total={data?.general_count}
                    />
                </FlexBox>
                <FlexBox cls="flex-col md:flex-row gap-4">
                    <TopCars data={data?.top10} filter={filter} />
                    <DontPay />
                </FlexBox>
                <FlexBox cls="flex-col md:flex-row gap-4">
                    <PeakHours data={data?.graphic} filter={filter} />
                </FlexBox>
            </div>
        </>
    );
};
