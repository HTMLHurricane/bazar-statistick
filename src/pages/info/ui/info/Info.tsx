import { Navbar } from '@/widgets/navbar';
import { InfoHead } from '../headed/InfoHead.async';
import { InfoTable } from '../table/InfoTable.async';

const Info = () => {
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

export default Info;
