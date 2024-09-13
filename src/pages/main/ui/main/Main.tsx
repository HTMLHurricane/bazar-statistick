/* eslint-disable react-hooks/rules-of-hooks */
import { Navbar } from '@/widgets/navbar';
import { TopCars } from '../topCars/TopCars';
import PeakHours from '../peakHours/PeakHours';
import { Last } from '../last/Last';
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
import { MainHead } from '../header/MainHead';
import { Count } from '@/shared/ui';
import {
    getDefaultDateDay,
    getDefaultDateMonth,
    getDefaultDateWeek,
} from '@/shared/lib/defaultDate/defaultDate';

export const MainPage = () => {
    const [data, setData] = useState<AttendanceResponse | undefined>(undefined);
    const limit = useGetLimit();
    const page = useGetPage();
    const filter = useGetFilter();

    const getCarData = () => {
        switch (filter) {
            case 'day':
                return useGetCarDay(
                    { limit, page, date: getDefaultDateDay() },
                    { pollingInterval: 5000, refetchOnFocus: false },
                );
            case 'week':
                return useGetCarWeek(
                    { limit, page, week: getDefaultDateWeek() },
                    { pollingInterval: 5000, refetchOnFocus: false },
                );
            case 'month':
                return useGetCarMonth(
                    { limit, page, month: getDefaultDateMonth() },
                    { pollingInterval: 5000, refetchOnFocus: false },
                );
            default:
                return undefined;
        }
    };

    const { data: carData } = getCarData() || {};

    useEffect(() => {
        setData(carData);
    }, [filter, carData]);

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
                            flag="cars"
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
                            flag="car"
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
