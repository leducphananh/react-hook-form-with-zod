import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { User, UserSchema } from './types';

const App = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<User>({
        resolver: zodResolver(UserSchema),
    });

    const onSubmit = (data: User) => {
        console.log('data', data);
    };

    return (
        <div className="container m-auto p-24">
            <h1 className="text-3xl font-bold mb-4">
                React Hook Form With Zod
            </h1>
            <Form onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email && errors.email.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input placeholder="Email" {...field} />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={errors.yearsOfExperience ? 'error' : ''}
                    help={
                        errors.yearsOfExperience &&
                        errors.yearsOfExperience.message
                    }
                >
                    <Controller
                        name="yearsOfExperience"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="number"
                                placeholder="Years of Experience (1 - 10)"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                }}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password && errors.password.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input.Password placeholder="Password" {...field} />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={errors.confirmPassword ? 'error' : ''}
                    help={
                        errors.confirmPassword && errors.confirmPassword.message
                    }
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input.Password
                                placeholder="Confirm Password"
                                {...field}
                            />
                        )}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default App;
