import { Navbar } from '@/widgets/navbar';
import { InfoByDateTable } from '../table/InfoByDateTable.async';
import { InfoByDateHeader } from '../header/InfoByDateHeader.async';

const InfoByDate = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-[5%] pb-10">
                <InfoByDateHeader />
                <InfoByDateTable />
            </div>
        </>
    );
};

export default InfoByDate;
