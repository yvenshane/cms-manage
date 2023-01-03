import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import "./less/login.less"
import logoImg from '../assets/images/logo.png'
import { RegisterApi } from '../request/api';

export default function Register() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        RegisterApi({
            username: values.username, 
            password: values.password
        }).then(res=>{
            console.log(res);
            if (res.errCode === 0) {
                message.success(res.message);
                setTimeout(()=>navigate('/login'), 1500)
            } else {
                message.error(res.message);
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login'>
            <div className='login_box'>
                <img src={logoImg} alt="" />
                <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item name="username" rules={[{ required: true, message: '请输入你的用户名!' }]}>
                        <Input size='large' prefix={<UserOutlined />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码!' }]}>
                        <Input.Password size='large' prefix={<LockOutlined />} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item name="confirm" dependencies={['password']} hasFeedback
                        rules={[
                            { required: true, message: '请确认你的密码!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('你输入的两个密码不匹配!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' prefix={<LockOutlined />} placeholder="请确认密码" />
                    </Form.Item>

                    <Form.Item>
                        <Link to="/login">已有账号？前往登录</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' type="primary" htmlType="submit" block>立即注册</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}