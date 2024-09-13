import { Navbar } from '@/widgets/navbar';
import { InfoHead } from '../headed/InfoHead';
import { InfoTable } from '../table/InfoTable'

export const Info = () => {
    
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-[5%] pb-10">
                <InfoHead />
                <InfoTable />
            </div>
        </>
    );
};
