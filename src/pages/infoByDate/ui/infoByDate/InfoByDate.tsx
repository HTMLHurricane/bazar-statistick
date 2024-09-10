import { Navbar } from '@/widgets/navbar';
import { InfoByDateTable } from '../table/InfoByDateTable';

export const InfoByDate = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-[5%] pb-10 flex justify-center">
                <InfoByDateTable />
            </div>
        </>
    );
};
