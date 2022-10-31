import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, message, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase';
import "./style.css"
const Register = () => {

    const onFinish = (values) => {
        if(values.password===values.rePassword){
            register(values);
            console.log('Success:', values);
        }
        else{
            message.error('Mật khẩu nhập lại không trùng khớp');
        }
      };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const register = async (formData) =>{
        try{
          const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          message.success('Đăng ký thành công');
    
        } catch(err){
            message.error(err.message);
        }
    }


    return (
    <div className='account-container'>
        <img src='../image/iot-soup.png'/>
    <div className='form-account'>
        <>
            <h2>Đăng ký</h2>
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
                    label="Nhập lại mật khẩu"
                    name="rePassword"
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
                    Submit
                    </Button>
                </Form.Item>
            </Form>
            <p>Bạn đã có tài khoản? 
                <Link to='/'>Đăng nhập</Link>
            </p>
        </>
        </div>
    </div>
  )
}

export default Register