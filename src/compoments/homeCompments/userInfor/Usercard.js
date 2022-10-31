import { Button, Modal, Card, Avatar, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faBriefcase, faBuilding, faPhone, faUpload, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import {
    doc,
    setDoc,
    getDoc
  } from "firebase/firestore";

import { db } from '../../../firebase';
import Loading from '../../../Loading';
const { Meta } = Card;
const Usercard = ({state,modal2Open,setModal2Open,linkImg}) => {
    const [loading, setLoading] = useState(false)

    const userInfor = state.allUser.filter(function(user){
        return user.id===linkImg.id;
      })
    //   console.log(userInfor)
  return (
    <>
        {loading&&<Loading />}
      <Modal
        className='user-card'
        title="Thông tin người đăng ký"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
                
        <Card
            style={{
            width: '100%',
            }}
            cover={
            <img
                alt="example"
                src={linkImg.img}
                style={{width:'120px'}}
            />
            }
        >
            <Row>
                <Col span={12}>
                    <Meta
                    avatar={<FontAwesomeIcon style={{fontSize:"30px",color: "#5DA7DB"}} icon={faUser} />}
                    title="Tên"
                    description={userInfor.length>0?userInfor[0].name:"Ten"}
                    />
                </Col>
                <Col span={12}>
                    <Meta
                    avatar={<FontAwesomeIcon style={{fontSize:"30px",color: "#5DA7DB"}} icon={faEnvelope} />}
                    title="Gmail"
                    description={userInfor.length>0?userInfor[0].email:"Gmail"}
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={12}>
                    <Meta
                    avatar={<FontAwesomeIcon style={{fontSize:"30px",color: "#5DA7DB"}} icon={faPhone} />}
                    title="Số điện thoại"
                    description={userInfor.length>0?userInfor[0].numberPhone:"Số điện thoại"}
                    />
                </Col>
                <Col span={12}>
                    <Meta
                    avatar={<FontAwesomeIcon style={{fontSize:"30px",color: "#5DA7DB"}} icon={faAddressCard} />}
                    title="Mã Số"
                    description={userInfor.length>0?userInfor[0].ms:"Mã Số"}
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={12}>
                    <Meta
                    avatar={<FontAwesomeIcon style={{fontSize:"30px",color: "#5DA7DB"}} icon={faBriefcase} />}
                    title="Chức vụ"
                    description={userInfor.length>0?userInfor[0].work:"Chức vụ"}
                    />
                </Col>
                <Col span={12}>
                    <Meta
                    avatar={<FontAwesomeIcon style={{fontSize:"30px",color: "#5DA7DB"}} icon={faBuilding} />}
                    title="Công ty"
                    description={userInfor.length>0?userInfor[0].company:"Công ty"}
                    />
                </Col>
            </Row>
        </Card>
      </Modal>
    </>
  );
};
export default Usercard;