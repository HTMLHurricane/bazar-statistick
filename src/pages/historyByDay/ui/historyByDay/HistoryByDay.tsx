import { Navbar } from '@/widgets/navbar';
import { HistoryByDayHeader } from '../header/HistoryByDayHeader.async';
import { HistoryByDayLast } from '../last/HistoryByDayLast.async';
import { useParams } from 'react-router-dom';
import { useGetHistoryDay } from '@/entities/history/api/historyApi';
import { HistoryByTopCars } from '../topCars/HistoryByTopCars.async';

const HistoryByDay = () => {
    const { dateDay } = useParams();
    const { data } = useGetHistoryDay({ date: dateDay! });
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-[5%] pb-10">
                <HistoryByDayHeader date={dateDay!} />
                <HistoryByTopCars data={data?.general?.slice(0, 10)} />
                <HistoryByDayLast data={data?.general} />
            </div>
        </>
    );
};

export default HistoryByDay;
