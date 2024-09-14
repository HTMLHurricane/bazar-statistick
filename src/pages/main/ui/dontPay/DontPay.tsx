import { DontPayResponse } from '@/entities/dontPay/model/types/dontPayTypes';
import { Button, Table, TableProps, Modal, message } from 'antd';
import { CreateDontPay } from '@/features/createDontPay';
import {
    useDeleteDontPay,
    useGetDontPayCars,
} from '@/entities/dontPay/api/dontPayApi';
import { useMainActions } from '@/entities/main/model/slice/mainSlice';
import {
    useGetIsModalVisible,
    useGetIsUpdateModal,
} from '@/entities/main/model/selectors/mainSelectors';
import { Card, DeleteButton } from '@/shared/ui';
import { useEffect } from 'react';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UpdateWorkingGraphic } from '@/features/updateWorkingGraphic';

export const DontPay = () => {
    const isModalVisible = useGetIsModalVisible();
    const isUpdateModal = useGetIsUpdateModal();
    const { setIsModalVisible, setIsUpdateModal } = useMainActions();
    const { data } = useGetDontPayCars();
    const [deleteDontPay, { isSuccess }] = useDeleteDontPay();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showUpdateModal = () => {
        setIsUpdateModal(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancelUpdate = () => {
        setIsUpdateModal(false);
    };
    const columns: TableProps<DontPayResponse>['columns'] = [
        {
            title: 'Номер машины',
            dataIndex: 'number',
        },
        {
            title: (
                <div className="flex justify-center">
                    <Button onClick={showModal}>
                        <FontAwesomeIcon icon={faPlus} /> номер
                    </Button>
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
                title={
                    <div className='flex items-center justify-between'>
                        <div>Администрация</div>
                        <Button onClick={showUpdateModal}>
                            <FontAwesomeIcon icon={faPen} /> график
                        </Button>
                    </div>
                }
                className="shadow-lg rounded-lg overflow-hidden mx-auto my-4 w-full md:w-3/4 lg:w-2/3"
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
                <CreateDontPay />
            </Modal>
            <Modal
                title="Изменить рабочий график"
                open={isUpdateModal}
                onCancel={handleCancelUpdate}
                footer={null}
            >
                <UpdateWorkingGraphic />
            </Modal>
        </>
    );
};
