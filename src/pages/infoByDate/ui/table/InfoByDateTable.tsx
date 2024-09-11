import { useGetInfoByDate } from '@/entities/infoByDate/api/infoByDateApi';
import { CarsInfoByNumImage } from '@/entities/infoByDate/model/infoByDateType';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Table, TableProps, Image, Button } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const InfoByDateTable = () => {
    const { id, date } = useParams();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const { data } = useGetInfoByDate({
        limit,
        page,
        date,
        car_number: id,
    });
    const downloadFile = () => {
        const url = `https://bazar-api.aralhub.uz/export-data/car?date=${date}&car_number=${id}`;
        window.location.href = url;
    };

    const columns: TableProps<CarsInfoByNumImage>['columns'] = [
        
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
        {
            title: (
                <Button onClick={downloadFile}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    скачать
                </Button>
            ),
            dataIndex: 'download',
            key: 'download',
        },
    ];

    return (
        <Card>
            <Table
                dataSource={data?.cars}
                columns={columns}
                loading={Boolean(!data)}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: data?.overall_count,
                    onChange: (page, limit) => {
                        setPage(page);
                        setLimit(limit);
                    },
                    showSizeChanger: true,
                    onShowSizeChange: (_, size) => setLimit(size),
                }}
                rowKey={(rec) => rec.image}
                className="w-full"
                scroll={{ x: true }}
            />
        </Card>
    );
};
