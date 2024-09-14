import { Image, Table, TableProps } from 'antd';
import { GeneralData, IFilter } from '@/entities/main';
import {
    useGetLimit,
    useGetPage,
} from '@/entities/main/model/selectors/mainSelectors';
import { useMainActions } from '@/entities/main/model/slice/mainSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui';

interface LastProps {
    data: GeneralData[] | undefined;
    total: number | undefined;
    filter: IFilter;
}

export const Last = ({ data, filter, total }: LastProps) => {
    const limit = useGetLimit();
    const page = useGetPage();
    const { setLimit, setPage } = useMainActions();
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
            title={`Информация за ${
                filter === 'day'
                    ? 'день'
                    : filter === 'week'
                    ? 'неделю'
                    : 'месяц'
            }`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full md:w-3/4 lg:w-2/3"
        >
            <Table
                dataSource={data}
                loading={Boolean(!data)}
                columns={columns}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: total,
                    onChange: (page, limit) => {
                        setPage(page);
                        setLimit(limit);
                    },
                    showSizeChanger: true,
                    onShowSizeChange: (_, size) => setLimit(size),
                }}
                rowKey={(rec) => rec.attend_id}
                onRow={(rec) => ({
                    onClick: () => {
                        if (!isPreviewOpened) {
                            navigate(`/${rec.car_number}`);
                        }
                    },
                    className: 'hover:cursor-pointer',
                })}
                className="w-full"
                scroll={{ y: 450 }}
            />
        </Card>
    );
};
