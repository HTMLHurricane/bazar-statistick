import { useCreateDontPay } from '@/entities/dontPay/api/dontPayApi';
import { useMainActions } from '@/entities/main/model/slice/mainSlice';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';

export const CreateDontPay = () => {
    const [create, { isSuccess, isLoading, isError }] = useCreateDontPay();
    const { setIsModalVisible } = useMainActions();
    const onSubmit = (data: { number: string }) => {
        create(data);
    };
    useEffect(() => {
        if (isSuccess) {
            message.success('Номер успешно добавлен');
            setIsModalVisible(false);
        }
        if (isError) {
            message.error('Произошла ошибка при добавлении номера');
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onSubmit}
            layout="vertical"
            className="w-full md:w-[1000px]"
        >
            <Form.Item<{ number: string }>
                name="number"
                label="Номер машины"
                rules={[
                    { required: true, message: 'Пожалуйста, заполните поле!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
                Сохранить
            </Button>
        </Form>
    );
};
