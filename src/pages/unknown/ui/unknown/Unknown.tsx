import { useState, useEffect, FC, memo } from 'react';
import { Navbar } from '@/widgets/navbar';
import { UnknownHeader } from '../header/UnknownHeader.async';
import {
    useGetUnknownDate,
    useGetUnknownLimit,
    useGetUnknownPage,
} from '@/entities/unknown/model/selectors/unknownSelectors';
import { UnknownTable } from '../table/UnknownTable.async';
import { useGetUnknownCars } from '@/entities/unknown/api/unknownApi';
import { getDefaultDateDay } from '@/shared/lib/defaultDate/defaultDate';
import { Count, Input, Button, Modal } from '@/shared/ui';

interface PasswordModalProps {
    onSubmit: (password: string) => void;
}

const PasswordModal: FC<PasswordModalProps> = ({ onSubmit }) => {
    const [password, setPassword] = useState<string>('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(password);
    };

    return (
        <Modal
            title="Введите пароль"
            open={true}
            footer={null}
            closable={false}
        >
            <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Введите пароль"
            />
            <Button
                type="primary"
                onClick={handleSubmit}
                style={{ marginTop: '10px' }}
            >
                Войти
            </Button>
        </Modal>
    );
};

const Unknown: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const date = useGetUnknownDate();
    const limit = useGetUnknownLimit();
    const page = useGetUnknownPage();
    const selectedDate = date || getDefaultDateDay();

    const { data } = useGetUnknownCars(
        { limit, page, date: selectedDate },
        { pollingInterval: 25000, refetchOnFocus: false },
    );

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsModalOpen(true);
        }
    }, []);

    const handlePasswordSubmit = (password: string) => {
        const correctPassword = '1221';

        if (password === correctPassword) {
            localStorage.setItem('isAuthenticated', 'true');
            setIsAuthenticated(true);
            setIsModalOpen(false);
        } else {
            alert('Неверный пароль');
        }
    };

    return (
        <>
            {isModalOpen && <PasswordModal onSubmit={handlePasswordSubmit} />}
            {isAuthenticated && (
                <>
                    <Navbar />
                    <div className="container mx-auto px-[5%] pb-10">
                        <UnknownHeader />
                        <UnknownTable
                            limit={limit}
                            page={page}
                            data={data?.unknown_cars}
                            total={data?.total_attendance}
                        />
                        <Count
                            flag="cars"
                            count={data?.total_attendance}
                            title="Поток машин"
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default memo(Unknown);
