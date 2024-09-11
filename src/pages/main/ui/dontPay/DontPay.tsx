import { DontPayResponse } from '@/entities/dontPay/model/types/dontPayTypes';
import { Button, Card, Table, TableProps, Modal, message } from 'antd';
import { CreateDontPay } from '@/features/createDontPay';
import {
    useDeleteDontPay,
    useGetDontPayCars,
} from '@/entities/dontPay/api/dontPayApi';
import { useMainActions } from '@/entities/main/model/slice/mainSlice';
import { useGetIsModalVisible } from '@/entities/main/model/selectors/mainSelectors';
import { DeleteButton } from '@/shared/ui';
import { useEffect } from 'react';

export const DontPay = () => {
    const isModalVisible = useGetIsModalVisible();
    const { setIsModalVisible } = useMainActions();
    const { data } = useGetDontPayCars();
    const [deleteDontPay, { isSuccess }] = useDeleteDontPay();
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns: TableProps<DontPayResponse>['columns'] = [
        {
            title: 'Номер машины',
            dataIndex: 'number',
        },
        {
            title: (
                <div className="flex justify-end">
                    <Button onClick={showModal}>Добавить номер</Button>
                </div>
            ),
            dataIndex: 'options',
            render: (_, rec) => (
                <div className="flex justify-center">
                    <DeleteButton onConfirm={() => deleteDontPay(rec.number)} />
                </div>
            ),
        },
    ];
    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно удалено');
        }
    }, [isSuccess]);
    return (
        <>
            <Card
                title="Администрация"
                className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4 w-full md:w-3/4 lg:w-2/5"
            >
                <Table
                    dataSource={data}
                    loading={Boolean(!data)}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    rowKey={(rec) => rec.id}
                />
            </Card>

            <Modal
                title="Добавить номер"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <CreateDontPay className="p-4" />
            </Modal>
        </>
    );
};
