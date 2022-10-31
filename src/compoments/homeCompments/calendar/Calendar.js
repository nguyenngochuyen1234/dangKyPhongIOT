import Week from './week/Week'
import Squaremonth from './month/Squaremonth';
import React,{useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import { actions } from '../../../store'
import { Button,Radio,DatePicker  } from 'antd';
import {LeftOutlined,
        RightOutlined,
        SearchOutlined
        } from '@ant-design/icons'
import {useNavigate} from "react-router-dom" 
const Calendar = ({state, dispatch}) => {
  const navigate = useNavigate();
// handle week
  const handlePrev = () => {
    setFirstDateOfWeek(prev=>prev.subtract(1, state.className))
  }
  
  const handleNext = () => {
    setFirstDateOfWeek(prev=>prev.add(1, state.className))
  }

  const dayjs = require('dayjs')

  const [daySearch, setDaySearch] = useState('')

  const [firstDateOfWeek, setFirstDateOfWeek] = useState(state.dayjsDefault.startOf('w'))
  
  useEffect(()=>{
    setFirstDateOfWeek(state.dayjsDefault.startOf('w'))
    if(state.className==='month'){
      navigate("/home/calendar/month")
    }else if(state.className==='week'){
      navigate("/home/calendar")
    }
    else{
      navigate("/home/calendar/year")
    }
  },[])

  


  useEffect(()=>{
    dispatch(actions.setDayjsDefault(firstDateOfWeek))

  },[firstDateOfWeek])

  const handleChange = (e) =>{
    dispatch(actions.setClassName(e.target.value))
    if(e.target.value==='month'){
      navigate("/home/calendar/month")
    }else if(e.target.value==='week'){
      navigate("/home/calendar")
    }
    else{
      navigate("/home/calendar/year")
    }
  }

  const handleOnClick = () =>{
    setFirstDateOfWeek(dayjs(daySearch.year() + "-" + (daySearch.month()+1) + "-" + daySearch.date(), "YYYY-MM-DD").startOf('w'))
  }


  return (
    <div  className='calendar'>
      <div className='header-form'>
        <div className='list-btn'>
          <h3>Tháng {firstDateOfWeek.month()+1} Năm {firstDateOfWeek.year()}</h3>
          <Button onClick={handlePrev} icon={<LeftOutlined />}></Button>
          <Button onClick={handleNext} icon={<RightOutlined />}></Button>
        </div>
        <div className='search-day'>
          <DatePicker 
          onChange={setDaySearch}
          value={daySearch}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleOnClick}>
          </Button>
        </div>
        <Radio.Group defaultValue="week" buttonStyle="solid" onChange={handleChange} value={state.className}>
          <Radio.Button value="week">Tuần</Radio.Button>
          <Radio.Button value="month">Tháng</Radio.Button>
          <Radio.Button value="year">Năm</Radio.Button>
      </Radio.Group>
      </div>
      {state.className==='week'&&<Week state={state} dispatch={dispatch} firstDateOfWeek={state.dayjsDefault.startOf('w')} className={state.class}/>}
      <Outlet />
    </div>
  )
}

export default Calendar