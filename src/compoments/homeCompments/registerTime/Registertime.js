import { Button, Select, Form, message, DatePicker, Row, Col } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { db } from "../../../firebase";
import uuid from "react-uuid"
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import Displaytime from './Displaytime';

import './styles.css'
const Regsitertime = ({state,dispatch}) => {




    const OPTIONS = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ Nhật'];
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    const [show, setShow] = useState(true);

    const [alertErr, setAlertErr] = useState([])

    const [dayStart, setDayStart] = useState('')
    const [dayEnd, setDayEnd] = useState('')
    
    const HOURS = ["7:00-8:00","8:00-9:00","9:00-10:00","10:00-11:00","11:00-12:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00",
    "17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00","21:00-22:00"];
    const [selectedHour, setSelectedHour] = useState([]);
    const filteredHour = HOURS.filter((o) => !selectedHour.includes(o));

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    console.log(state.listTime)

    const checkTime = (dayStartUser, dayEndUser, daysUser, hoursUser,dayStart, dayEnd, days, hours) =>{
      const DaysSet = new Set([...daysUser, ...days])
      const HoursSet = new Set([...hoursUser,...hours]) 
      return (dayjs(dayStartUser, "YYYY-MM-DD")).isBefore(dayjs(dayEnd))&&(dayjs(dayEndUser, "YYYY-MM-DD").isAfter(dayjs(dayStart)))
              &&(DaysSet.size<(daysUser.length+days.length))&&(HoursSet.size<(hoursUser.length+hours.length))
    }

    const dayjs = require('dayjs')
    console.log(alertErr)
    
  // Kiểm tra xem thời gian người dùng có bị trùng không
    const checkTimeRangeOverLapping = (dayStartUser, dayEndUser, daysUser, hoursUser) =>{
      const check = state.listTime.filter(time=>(checkTime(dayStartUser, dayEndUser, daysUser, hoursUser,time.dayStart,time.dayEnd,time.days,time.hours)))
      return check;
    }

  const handleOk = async(e) => {
    try{
      const timeOverLapping=(checkTimeRangeOverLapping(dayStart,dayEnd,selectedItems,selectedHour))
      setAlertErr([])
      if(selectedItems.length===0||selectedHour.length===0||!dayStart||!dayEnd){
        message.error('Đăng ký thời gian thất bại');
        return
      }
      else if(timeOverLapping.length>0){
        console.log(timeOverLapping)
        timeOverLapping.forEach(time=>{
          let stringTime;
          let messHours = [],messDays = []
          const hoursGeneral = new Set([...time.hours])
          const daysGeneral = new Set([...time.days])
          if(dayjs(time.dayStart).isBefore(dayStart)){
            stringTime = (dayStart.year() + '-' + (dayStart.month()+1) + '-' + dayStart.date() + " đến " + time.dayEnd)
          }
          else{
            stringTime = (time.dayStart + " đến " + dayEnd.year() + '-' + (dayEnd.month()+1) + '-' + dayEnd.date())
          }
          setAlertErr(prev=>{
            return [...prev,{
              hoursGeneral: selectedHour.filter(hour=>(hoursGeneral.has(hour))).join(),
              daysGeneral: selectedItems.filter(hour=>(daysGeneral.has(hour))).join(),
              stringTime:stringTime
            }]
          })
        })
        message.error("Thời gian đăng ký đã bị trùng, vui lòng chọn thời gian khác")
        return
      }
      else if(!(dayjs(dayStart, "YYYY-MM-DD").isBefore(dayjs(dayEnd)))){
        message.error("Ngày bắt đầu phải trước ngày kết thúc")
        return
      }
      else{
        await setDoc(doc(db,"user/" + localStorage.getItem("id")+"/registerTime",uuid()),{
            days: selectedItems,
            hours:selectedHour,
            dayStart: dayStart.year() + '-' + (dayStart.month()+1) + '-' + dayStart.date(),
            dayEnd: dayEnd.year() + '-' + (dayEnd.month()+1) + '-' + dayEnd.date(),
          })
        message.success('Đăng ký thời gian thành công');
        selectedItems([])
        setSelectedHour([])
        setDayStart('')
        setDayEnd('')
      }}catch(err){
        console.log(err)
      }
      window.location.reload()
  };

  return (
  <div style={{display:"flex",flexDirection:"row"}}>
    <div className='register-time'>
    {localStorage.getItem("registered")
    ?<><Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
        <Form.Item label="Chọn ngày">
        <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
                width: '100%',
            }}
            >
            {filteredOptions.map((item) => (
                <Select.Option key={item} value={item}>
                {item}
                </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Chọn ca">
        <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedHour}
            onChange={setSelectedHour}
            style={{
                width: '100%',
            }}
            >
            {filteredHour.map((item) => (
                <Select.Option key={item} value={item}>
                {item}
                </Select.Option>
            ))}
        </Select>
      </Form.Item>
        
        <Form.Item>
            <Row gutter={10}>
                <Col span={20}>
                    <Form.Item label="Ngày bắt đầu">
                        <DatePicker 
                        onChange={setDayStart}
                        value={dayStart}
                        />
                    </Form.Item>
                </Col>
                <Col span={20}>
                    <Form.Item label="Ngày kết thúc">
                    <DatePicker 
                        onChange={setDayEnd}
                        value={dayEnd}                      
                    />
                  </Form.Item>
                </Col>
            </Row>
              <Row>
                <Button type="primary" onClick={handleOk}>Đăng ký</Button>
                <Button type="primary" style={{marginLeft: '100px'}}  onClick={()=>{
                          setSelectedItems([])
                          setSelectedHour([])
                          setDayStart('')
                          setDayEnd('')
                }}>Clear All</Button>
              </Row>
        </Form.Item>
    </Form>
      <div style={{width:"80%"}}>
        <Displaytime  onload="script()"/>
      </div></>
    :<h1>Trước khi đăng ký hãy cập nhật thông tin</h1>
    }

    </div>
    <div style={{display:"flex",flexDirection:"column",overflow:"auto",maxHeight:"100vh"}}>
      {alertErr.length>0&&
         alertErr.map((alert, idx)=>
          <Alert key={idx} className='alert-p' variant="danger" onClose={() => setShow(false)}>
            <Alert.Heading>Bạn đăng ký trùng thời gian </Alert.Heading>
            <p>{alert.daysGeneral}</p>
            <p>Ca {alert.hoursGeneral}</p>
            <p>Từ ngày {alert.stringTime}</p>
          </Alert>
          )
      }
    </div>

  </div>
  );
};
export default Regsitertime;