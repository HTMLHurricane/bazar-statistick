import { useGetDateMonth } from '@/entities/history/model/selectors/historySelectors';
import { CarEntry } from '@/entities/info';
import { useGetCarInfo } from '@/entities/info/api/infoApi';
import {
    useGetInfoLimit,
    useGetInfoPage,
} from '@/entities/info/model/selectors/infoSelectors';
import { useInfoActions } from '@/entities/info/model/slice/infoSlice';
import { Card } from '@/shared/ui';
import { Table, Image, TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const InfoTable = () => {
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const date = useGetDateMonth();
    const limit = useGetInfoLimit();
    const page = useGetInfoPage();
    const { setLimit, setPage } = useInfoActions();
    const getDefaultDateMonth = () => {
        const today = new Date();
        return today.toISOString().slice(0, 7);
    };
    const selectedDate = date || getDefaultDateMonth();
    const { data } = useGetCarInfo({
        month: selectedDate,
        limit,
        page,
        car_number: id,
    });

    const columns: TableProps<CarEntry>['columns'] = [
        {
            title: 'День',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Номер машины',
            dataIndex: 'car_number',
            key: 'car_number',
        },
        {
            title: 'Первый заезд',
            dataIndex: 'first_time',
            key: 'first_time',
        },
        {
            title: 'Фото прихода',
            dataIndex: 'first_image',
            key: 'first_image',
            render: (photo) => (
                <Image
                    width={90}
                    onClick={(e) => e.stopPropagation()}
                    preview={{ onVisibleChange: setIsPreviewOpened }}
                    src={photo}
                    alt="photo"
                />
            ),
        },
        {
            title: 'Последний заезд',
            dataIndex: 'last_time',
            key: 'last_time',
        },
        {
            title: 'Фото ухода',
            dataIndex: 'last_image',
            key: 'last_image',
            render: (photo) => (
                <Image
                    width={90}
                    onClick={(e) => e.stopPropagation()}
                    preview={{ onVisibleChange: setIsPreviewOpened }}
                    src={photo}
                    alt="photo"
                />
            ),
        },
        {
            title: <div className="text-center">Количество заездов</div>,
            dataIndex: 'overall_count',
            key: 'overall_count',
            render: (count) => <div className="text-center">{count}</div>,
        },
    ];
    return (
        <Card
            title="Информация о машине за месяц"
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 w-full mt-8"
        >
            <Table
                dataSource={data}
                columns={columns}
                loading={Boolean(!data)}
                onRow={(rec) => ({
                    onClick: () => {
                        if (!isPreviewOpened) {
                            navigate(`/${rec.car_number}/${rec.date}`);
                        }
                    },
                    className: 'hover:cursor-pointer',
                })}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: data?.length,
                    onChange: (page, limit) => {
                        setPage(page);
                        setLimit(limit);
                    },
                    showSizeChanger: true,
                    onShowSizeChange: (_, size) => setLimit(size),
                }}
                rowKey={(rec) => rec.date}
                className="w-full"
                scroll={{ x: true }}
            />
        </Card>
    );
};
