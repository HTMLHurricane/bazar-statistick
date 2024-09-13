import { useMainActions } from '@/entities/main/model/slice/mainSlice';
import { WorkingGraphicForm } from '@/entities/workGraphic';
import {
    updateWorkingGraphic,
    useGetWorkingGraphic,
} from '@/entities/workGraphic/api/workGraphic';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';

export const UpdateWorkingGraphic = () => {
    const [form] = Form.useForm();
    const [update, { isSuccess, isLoading, isError }] = updateWorkingGraphic();
    const { data } = useGetWorkingGraphic();
    const { setIsUpdateModal } = useMainActions();
    const onSubmit = (data: WorkingGraphicForm) => {
        update(data);
    };
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                start_time: data.start_time,
                end_time: data.end_time,
            });
        }
    }, [data, form]);

    useEffect(() => {
        if (isSuccess) {
            message.success('График успешно изменен');
            setIsUpdateModal(false);
        }
        if (isError) {
            message.error('Произошла ошибка при добавлении номера');
            console.log('error', isError);
        }
    }, [isSuccess, isError]);

    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onSubmit}
            layout="vertical"
            className="w-full md:w-[1000px]"
        >
            <Form.Item<WorkingGraphicForm>
                name="start_time"
                label="Начало рабочего времени"
                rules={[
                    { required: true, message: 'Пожалуйста, заполните поле!' },
                ]}
            >
                <Input placeholder="Например: 07:00" />
            </Form.Item>
            <Form.Item<WorkingGraphicForm>
                name="end_time"
                label="Конец рабочего времени"
                rules={[
                    { required: true, message: 'Пожалуйста, заполните поле!' },
                ]}
            >
                <Input placeholder="Например: 19:00" />
            </Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
                Сохранить
            </Button>
        </Form>
    );
};
