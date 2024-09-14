import { useGetHistoryData } from '@/entities/history/api/historyApi';
import { useGetDateMonth } from '@/entities/history/model/selectors/historySelectors';
import { HistoryDataResponse } from '@/entities/history/model/types/historyType';
import { Card } from '@/shared/ui'
import { Button, Table, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';

export const HistoryTable = () => {
    const navigate = useNavigate();
    const dateMonth = useGetDateMonth();
    const getDefaultDateMonth = () => {
        const today = new Date();
        return today.toISOString().slice(0, 7);
    };
    const selectedDate = dateMonth || getDefaultDateMonth();
    const { data } = useGetHistoryData({
        date: dateMonth || selectedDate,
    });
    const columns: TableProps<HistoryDataResponse>['columns'] = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            render: (date) => (
                <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/history/${date}`)}
                >
                    {date}
                </div>
            ),
        },
        {
            title: 'Платящие за вход',
            dataIndex: 'general_count',
            key: 'general_count',
        },
        {
            title: 'Всего машин',
            dataIndex: 'overall_count',
            key: 'overall_count',
        },
        {
            title: 'Поток машин',
            dataIndex: 'general_attendances_count',
            key: 'general_attendances_count',
        },
        {
            title: 'Топ 10 машин',
            dataIndex: 'top',
            key: 'top',
            render: (_, rec) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/history/${rec.date}`)}
                    >
                        Посмотреть
                    </Button>
                </>
            ),
        },
    ];
    return (
        <Card
            title={`История за ${selectedDate}`}
            className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 w-full mt-8"
        >
            <Table
                dataSource={data}
                loading={Boolean(!data)}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey={(rec) => rec.date}
                className="w-full"
                scroll={{ y: 300 }}
                size="small"
            />
        </Card>
    );
};
