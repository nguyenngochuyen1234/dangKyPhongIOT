import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form,message, Input } from 'antd';
import { signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase'
import {useNavigate} from "react-router-dom"

import "./style.css"
const Login = () => {

    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        login(values)
      };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const login = async (formData) =>{
        try{
          const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
          message.success('Đăng nhập thành công');
          navigate("/home")
        } catch(err){
            message.error(err.message);
        }
      }
    

    return (
    <div className='account-container'>
        <img src='../image/iot-soup.png'/>
    <div className='form-account'>
        <>
            <h2>Đăng nhập</h2>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{minWidth:"400px"}}
                    label="Email"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <p>Bạn chưa có tài khoản? 
                <Link to='/register'>Đăng ký</Link>
            </p>
        </>
        </div>
    </div>
  )
}

export default Login