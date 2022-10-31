import React,{useEffect, useState} from 'react'

import Squareweek from './Squareweek'
import { actions } from '../../../../store'
import "./week.css"
import Usercard from '../../userInfor/Usercard'
const Week = ({state,dispatch,firstDateOfWeek,className}) => {

  const [modal2Open, setModal2Open] = useState(false);

  const [imgLinkAndId, setImgLinkAndId] = useState('')

  // console.log(state.listTime)
  // console.log(firstDateOfWeek)


  const dayjs = require('dayjs')

  var isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween)

  const dayOfWeek = []
  for(let i = 0;i<7;i++){
    let day = firstDateOfWeek.add(i, "d")    
    dayOfWeek.push(day.year()+'-' + (day.month() + 1) + '-' + day.date())
  }
  const datesOfWeek = ['Chủ Nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7']

  function checkTime(day, time, idxDayOfWeek,ca){
    if(datesOfWeek[idxDayOfWeek]&&(time.hours.indexOf(ca)!==-1)){
      if(dayjs(day).isBetween(time.dayStart,time.dayEnd,null,'[')){
        if(time.days.indexOf(datesOfWeek[idxDayOfWeek])!==-1){
            return time.id
          }
        }
      }
        return null;
  }

  const checkTimeExit = (day, idxDayOfWeek,ca) =>{
    const check = state.listTime.filter(time=>(checkTime(day, time, idxDayOfWeek, ca)))
    return check.length>0?check[0].id:null
  }
  
  
  const renderHours = (ca) =>{
    if(dayOfWeek.length>0){
      return dayOfWeek.map((day,idxDayOfWeek)=>((checkTimeExit(day, idxDayOfWeek,ca)) || ''))
      
    }
  }
  const onLinkHandle = (id,img) =>{
    setModal2Open(true)
    setImgLinkAndId({id:id,img:img})

  }

  function findImage (id){
    return (state.listUrl.filter(function(url){
      return url.id===("images/"+id)
    }))
  }
  const Renderhours = ({ca}) =>{ 
    // console.log(renderHours(ca))
    const list = renderHours(ca).map((img, idx)=>{
      let srcImg = ''
      if(findImage(img).length>0){
        srcImg = (findImage(img)[0].link)
      }
      return <td key={idx}>{srcImg?<img onClick={()=>onLinkHandle(img,srcImg)} style={{
      cursor:"pointer",                      
      width: "32px",
      height: 32,
      objectFit: "contain"
}} src={srcImg}/>:''}</td>
    })
    return <>{list}</> 

  }

  const hoursRender = state.data.map(hour=>{
    return(
      <tr key={hour.id}>
        <td>{hour.ca}</td>
        <Renderhours ca={hour.ca}/>
      </tr>
    ) 
  }) 
  return (
    <>
      <Usercard state={state} modal2Open={modal2Open} setModal2Open={setModal2Open} linkImg={imgLinkAndId}/>
      <table className={`${state.className}-form`}>
        <thead>
          <tr style={{backgroundColor:"#fafafa",color:"#002E94"}}>
            <td></td>
            <td>Chủ Nhật</td>
            <td>Thứ 2</td>
            <td>Thứ 3</td>
            <td>Thứ 4</td>
            <td>Thứ 5</td>
            <td>Thứ 6</td>
            <td>Thứ 7</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <Squareweek state={state} firstDateOfWeek={firstDateOfWeek} month={firstDateOfWeek.month()} className="date"/>
          </tr>
        </tbody>
        <tfoot>
          {hoursRender}
        </tfoot>
      </table>
    </>
  )
}

export default Week