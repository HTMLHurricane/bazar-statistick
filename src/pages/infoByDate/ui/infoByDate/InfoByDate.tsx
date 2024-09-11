import { Navbar } from '@/widgets/navbar';
import { InfoByDateTable } from '../table/InfoByDateTable';
import { InfoByDateHeader } from '../head/InfoByDateHeader'

export const InfoByDate = () => {
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
