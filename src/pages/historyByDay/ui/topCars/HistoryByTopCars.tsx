import { GeneralData } from '@/entities/main';
import { Card } from '@/shared/ui';
import { Table, Image, TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TopCarsProps {
    data: GeneralData[] | undefined;
}

export const HistoryByTopCars = ({ data }: TopCarsProps) => {
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);
    const navigate = useNavigate();

    const columns: TableProps<GeneralData>['columns'] = [
        {
            title: 'Фото',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (photo) => (
                <Image
                    preview={{ onVisibleChange: setIsPreviewOpened }}
                    width={90}
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
            title={'Топ машин'}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 w-full mb-12 "
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
            />
        </Card>
    );
};
