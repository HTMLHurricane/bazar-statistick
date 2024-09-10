import { useGetInfoByDate } from '@/entities/infoByDate/api/infoByDateApi';
import { InfoByDateResponse } from '@/entities/infoByDate/model/infoByDateType';
import { Card, Table, TableProps, Image } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const InfoByDateTable = () => {
    const { id, date } = useParams();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const { data } = useGetInfoByDate({
        limit,
        page,
        date,
        car_number: id,
    });
    const columns: TableProps<InfoByDateResponse>['columns'] = [
        {
            title: 'Время',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Фото',
            dataIndex: 'image',
            key: 'image',
            render: (photo) => (
                <>
                    <Image
                        width={90}
                        onClick={(e) => e.stopPropagation()}
                        src={photo}
                        alt="photo"
                    />
                </>
            ),
        },
    ];

    return (
        <Card>
            <Table
                dataSource={data}
                columns={columns}
                loading={Boolean(!data)}
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
                rowKey={(rec) => rec.time}
                className="w-full"
                scroll={{ x: true }}
            />
        </Card>
    );
};
