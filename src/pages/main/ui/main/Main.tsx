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
import { MainHead } from '../head/MainHead'

export const MainPage = () => {
    const [data, setData] = useState<AttendanceResponse | undefined>(undefined);
    const limit = useGetLimit();
    const page = useGetPage();
    const filter = useGetFilter();
    const { data: carDayData } = useGetCarDay({ limit, page });
    const { data: carWeekData } = useGetCarWeek({ limit, page });
    const { data: carMonthData } = useGetCarMonth({ limit, page });

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
                    <Count count={data?.total_cars} filter={filter} />
                    <Last data={data?.general} filter={filter} />
                </FlexBox>
                <FlexBox cls="flex-col md:flex-row gap-4">
                    <PeakHours data={data?.graphic} filter={filter} />
                    <DontPay />
                </FlexBox>
                <TopCars data={data?.top10} filter={filter} />
            </div>
        </>
    );
};
