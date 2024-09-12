import { useState, memo } from 'react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeConfig } from '@/app/providers/router/routeConfig/routeConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Drawer, Menu, Input, List } from 'antd';
import { TOKEN } from '@/shared/const/localstorage';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { MenuOutlined } from '@ant-design/icons';
import { useLogout } from '@/entities/auth/api/authApi';
import { AllCars } from '@/entities/main/model/types/mainType';
import { useGetAllCars } from '@/entities/main/api/mainApi';

export const Navbar = memo(() => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCars, setFilteredCars] = useState<AllCars[]>([]);
    const { data } = useGetAllCars();
    const navigate = useNavigate();
    const [logout] = useLogout();

    const logoutBtn = () => {
        logout();
        localStorage.removeItem(TOKEN);
        navigate('/login');
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value && data) {
            const filtered = data.filter((car) =>
                car.number.toLowerCase().includes(value.toLowerCase()),
            );
            setFilteredCars(filtered);
        } else {
            setFilteredCars([]);
        }
    };

    const menuItems = [
        ...Object.values(routeConfig)
            .map(({ path, text }) =>
                path && text
                    ? {
                          key: path,
                          label: <NavLink to={path}>{text}</NavLink>,
                      }
                    : null,
            )
            .filter((item) => item !== null),
        {
            key: 'logout',
            label: (
                <Button
                    icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                    type="primary"
                    onClick={logoutBtn}
                >
                    Выйти
                </Button>
            ),
        },
    ];

    return (
        <>
            <FlexBox cls="px-[5%] flex justify-between items-center shadow-md mb-8">
                <FlexBox cls="flex items-center">
                    <nav className="hidden md:flex items-center">
                        {Object.values(routeConfig).map(
                            ({ path, text }) =>
                                path &&
                                text && (
                                    <NavLink
                                        key={path}
                                        className={({ isActive }) =>
                                            `p-6 hover:bg-[rgba(0,0,0,0.2)] ${
                                                isActive
                                                    ? 'border border-solid border-b-2 border-b-slate-950 border-x-0 border-t-0 bg-[rgba(0,0,0,0.1)]'
                                                    : ''
                                            }`
                                        }
                                        to={path}
                                    >
                                        {text}
                                    </NavLink>
                                ),
                        )}
                    </nav>
                </FlexBox>

                <FlexBox cls="relative w-full sm:w-2/3 md:w-1/3 mx-0 sm:mx-5 md:mx-10 py-2 sm:py-4">
                    <Input
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Введите номер машины..."
                        className="w-full"
                    />
                    {filteredCars.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 z-10 rounded-md shadow-lg pl-2">
                            <List
                                dataSource={filteredCars}
                                renderItem={(car) => (
                                    <List.Item
                                        onClick={() =>
                                            navigate(`/${car.number}`)
                                        }
                                        className="hover:bg-gray-100 p-2 cursor-pointer flex items-center"
                                    >
                                        {/* <img
                                            src={car.last_attendance?.image_url}
                                            alt=""
                                            className="w-12 h-12 mr-3"
                                        /> */}
                                        <div className="flex-1 flex justify-between items-center">
                                            <div className="font-bold">
                                                {car.number}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                {car.last_attendance.time}
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                                bordered={false}
                                className="p-0"
                                style={{
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    paddingRight: '5px',
                                    boxSizing: 'content-box',
                                }}
                            />
                        </div>
                    )}
                </FlexBox>

                <FlexBox cls="hidden md:flex items-center">
                    <Button
                        icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                        type="primary"
                        onClick={logoutBtn}
                    >
                        Выйти
                    </Button>
                </FlexBox>

                <Button
                    icon={<MenuOutlined />}
                    className="md:hidden ml-4"
                    type="text"
                    onClick={openDrawer}
                />
            </FlexBox>

            <Drawer
                placement="right"
                closable={true}
                onClose={closeDrawer}
                open={drawerOpen}
                width="320px"
                style={{ padding: 0 }}
            >
                <Menu mode="vertical" className="text-lg" items={menuItems} />
            </Drawer>
        </>
    );
});
