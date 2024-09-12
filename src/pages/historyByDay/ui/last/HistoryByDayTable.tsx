import { GeneralData } from '@/entities/main';
import { Card, Table, TableProps, Image } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryByDayLast {
    data: GeneralData[] | undefined;
}

export const HistoryByDayLast = ({ data }: HistoryByDayLast) => {
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);
    const navigate = useNavigate();

    const columns: TableProps<GeneralData>['columns'] = [
        {
            title: 'День',
            dataIndex: 'attend_date',
            key: 'attend_date',
        },
        {
            title: 'Номер машины',
            dataIndex: 'car_number',
            key: 'car_number',
        },
        {
            title: 'Время',
            dataIndex: 'attend_time',
            key: 'attend_time',
        },
        {
            title: <div className="text-center">Фото</div>,
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
            className: 'text-center',
        },
    ];

    return (
        <Card
            title={`Информация`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 w-full mt-8"
        >
            <Table
                dataSource={data}
                loading={Boolean(!data)}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey={(rec) => rec.attend_id}
                onRow={(rec) => ({
                    onClick: () => {
                        if (!isPreviewOpened) {
                            navigate(`/${rec.car_number}/${rec.attend_date}`);
                        }
                    },
                    className: 'hover:cursor-pointer',
                })}
                className="w-full"
                scroll={{ y: 300 }}
                size="small"
            />
        </Card>
    );
};
