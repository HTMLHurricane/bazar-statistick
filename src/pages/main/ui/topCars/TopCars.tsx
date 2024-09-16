import { IFilter, Top10Data } from '@/entities/main';
import { Card, Table, Image } from '@/shared/ui';
import { TableProps } from 'antd';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface TopCarsProps {
    data: Top10Data[] | undefined;
    filter: IFilter;
}

const TopCars = ({ data, filter }: TopCarsProps) => {
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);
    const navigate = useNavigate();

    const columns: TableProps<Top10Data>['columns'] = [
        {
            title: '№',
            dataIndex: 'top',
            key: 'top',
            render: (_: any, __: Top10Data, index: number) => <>{index + 1}</>,
        },
        {
            title: 'Фото',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (photo) => (
                <Image
                    preview={{ onVisibleChange: setIsPreviewOpened }}
                    width={60}
                    onClick={(e) => e.stopPropagation()}
                    src={photo}
                    alt="photo"
                />
            ),
        },
        {
            title: 'Номер машины',
            dataIndex: 'car_number',
            key: 'car_number',
            className: 'text-start',
        },
        {
            title: 'Дата',
            dataIndex: 'attend_date',
            key: 'attend_date',
            className: 'text-start',
        },
        {
            title: 'Количество',
            dataIndex: 'attend_count',
            key: 'attend_count',
            className: 'text-start',
        },
    ];

    return (
        <Card
            title={`Топ машин за ${
                filter === 'day'
                    ? 'день'
                    : filter === 'week'
                    ? 'неделю'
                    : 'месяц'
            }`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full max-w-4xl sm:p-0 !important"
        >
            <Table
                dataSource={data}
                loading={Boolean(!data)}
                columns={columns}
                pagination={false}
                rowKey={(rec) => rec.attend_id}
                className="w-full"
                onRow={(rec) => ({
                    onClick: () => {
                        if (!isPreviewOpened) {
                            navigate(`/${rec.car_number}/${rec.attend_date}`);
                        }
                    },
                    className: 'hover:cursor-pointer',
                })}
                scroll={{ x: true }}
                size="small"
            />
        </Card>
    );
};

export default memo(TopCars);
