import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import Avatargroup from './Avatargroup'

const Squareweek = ({state, firstDateOfWeek, month}) => {

  const dayjs = require('dayjs')
  // console.log(firstDateOfWeek)

  var arrayArrayId = []

  var isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween)
  
  const dayOfWeek = []
    for(let i = 0;i<7;i++){
        dayOfWeek.push(firstDateOfWeek.add(i, "d"))
    }
  const datesOfWeek = ['Chủ Nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7']

  function checkTime(day, time, idxDayOfWeek){
    if(datesOfWeek[idxDayOfWeek]){
      if(dayjs(day).isBetween(time.dayStart,time.dayEnd,null,'[')){
        if(time.days.indexOf(datesOfWeek[idxDayOfWeek])!==-1){
            return time.id
          }
        }
      }
        return null;
  }

  const checkTimeExit = (day, idxDayOfWeek) =>{
    const check = state.listTime.filter(time=>(checkTime(day, time, idxDayOfWeek,)))
    return check.length>0?(check.map(item=>(item.id))):null
  }
  
  
  const renderHours = () =>{
    if(dayOfWeek.length>0){
      return dayOfWeek.map((day,idxDayOfWeek)=>((checkTimeExit(day, idxDayOfWeek)) || ''))
    }
  }


  if(renderHours()){
    arrayArrayId = renderHours()
  }
  
  // console.log(arrayArrayId[8])
    const styles = (day) => {
      return{
        color:`${day.month()===month?"#000":"rgba(0,0,0,0.5)"}`,
      }
    }
    return (
      <>
        {dayOfWeek.map((day, id)=><td style={styles(day)} key={id}>{day.date()}
          <span>
            {arrayArrayId[id]&&<Avatargroup state={state} arrayId={arrayArrayId[id]}/>}
          </span>
        </td>)}
    </>
  )
}

export default Squareweek