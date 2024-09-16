import { Navbar } from '@/widgets/navbar';
import { HistoryHeader } from '../header/HistoryHeader.async';
import { HistoryTable } from '../table/HistoryTable.async';

const History = () => {
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

export default History;
