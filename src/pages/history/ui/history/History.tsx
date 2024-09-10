import { Navbar } from '@/widgets/navbar';
import { HistoryHeader } from '../header/HistoryHeader';
import { HistoryTable } from '../table/HistoryTable'

export const History = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-[5%] pb-10">
                <HistoryHeader />
                <HistoryTable />
            </div>
        </>
    );
};
