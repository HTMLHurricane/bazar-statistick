import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormProps, Input, message } from 'antd';
import { TOKEN } from '@/shared/const/localstorage';
import { useGetMeLazy, useLogin } from '@/entities/auth/api/authApi';
import { ILoginForm } from '@/entities/auth'

export const LoginForm = () => {
    const [login, { data, isSuccess, isError, isLoading }] = useLogin();
    const [triggerGetMe] = useGetMeLazy();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish: FormProps<ILoginForm>['onFinish'] = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });
        login(formData);
    };

    useEffect(() => {
        if (isError) {
            message.error('Вы ввели неправильную почту или пароль');
            form.resetFields(['username', 'password']);
        }
        if (isSuccess) {
            message.success('Добро пожаловать!');
            localStorage.setItem(TOKEN, String(data?.access_token));
            triggerGetMe();
            navigate('/');
        }
    }, [isError, isSuccess, data, triggerGetMe, navigate, form]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[400px]">
                <h1 className="text-center mb-5">Авторизация</h1>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    form={form}
                    style={{ width: 400 }}
                    onFinishFailed={(errorInfo) =>
                        console.log('Failed:', errorInfo)
                    }
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<ILoginForm>
                        label="Почта"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите вашу почту!',
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item<ILoginForm>
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите ваш пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={isLoading}
                            block
                            type="primary"
                            htmlType="submit"
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
