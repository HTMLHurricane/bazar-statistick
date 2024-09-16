import { UnknownCars } from '@/entities/unknown';
import { useUnknownActions } from '@/entities/unknown/model/slice/unknownSlice';
import { Card, Image, Table } from '@/shared/ui';
import { TableProps } from 'antd';
import { memo } from 'react';

export interface UnknownProps {
    data: UnknownCars[] | undefined;
    total: number | undefined;
    limit: number;
    page: number;
}

const UnknownTable = ({ data, total, limit, page }: UnknownProps) => {
    const { setLimit, setPage } = useUnknownActions();

    const columns: TableProps<UnknownCars>['columns'] = [
        {
            title: 'День',
            dataIndex: 'attend_date',
            key: 'attend_date',
        },
        {
            title: 'Номер машины',
            dataIndex: 'unknown_num',
            key: 'unknown_num',
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
            title="Информация"
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full md:w-3/4 lg:w-full"
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
                rowKey={(rec) => rec.attend_time}
                className="w-full"
                scroll={{ y: 450 }}
            />
        </Card>
    );
};

export default memo(UnknownTable);
