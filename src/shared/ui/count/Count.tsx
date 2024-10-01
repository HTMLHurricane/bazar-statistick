import { faCar, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, lazy, memo } from 'react';
import Card from '../card/Card';

const CountUp = lazy(() => import('react-countup'));

export interface CountProps {
    count: number | undefined;
    title: string;
    flag: 'car' | 'cars';
}

const Count = ({ count, title, flag }: CountProps) => {
    const [prevChild, setPrevChild] = useState(0);
    const [currentChild, setCurrentChild] = useState(0);

    useEffect(() => {
        if (count) {
            setPrevChild(currentChild);
            setCurrentChild(count);
        }
    }, [count]);

    return (
        <Card
            title={
                <div className="flex justify-between items-center">
                    {title}{' '}
                    <span className="pl-2">
                        {flag === 'cars' ? (
                            <>
                                <FontAwesomeIcon icon={faRepeat} />
                                <FontAwesomeIcon
                                    icon={faCar}
                                    className="text-xl text-blue-500 pl-2"
                                />
                            </>
                        ) : (
                            <FontAwesomeIcon
                                icon={faCar}
                                className="text-xl text-blue-500"
                            />
                        )}
                    </span>
                </div>
            }
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full md:w-full lg:w-full"
        >
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center py-6 md:py-8 lg:py-12 xl:py-16">
                <CountUp
                    useEasing={true}
                    start={prevChild}
                    end={currentChild}
                    duration={3}
                />
            </div>
        </Card>
    );
};

export default memo(Count);
