import React, { useState,useEffect, useLayoutEffect } from 'react'
import Squaremonth from '../month/Squaremonth';
import "./year.css"
import { actions } from '../../../../store';
import Month from '../month/Month';

const Year = ({state,dispatch,firstDayOfYear}) => {
  const [monthOfYear, setMonthOfYear] = useState(()=>{
    const defaultYear = []
    for(let i = 0;i<12;i++){
      defaultYear.push(firstDayOfYear.add(i,'M'))
    }
    return defaultYear
  })

  return (
    <>
    <div /* className='year' */>
      <h1 style={{fontSize: "15px"}}>Chức năng chưa hoàn thiện</h1>
    {/* { monthOfYear.map((firstDayOfMonth, idx)=>{
      const firstDateOfMONTH =  firstDayOfYear.add(idx,'M')
      return <Month key={idx} dayjsDefault={firstDayOfMonth} dispatch={dispatch}/>
    })} */}
    </div>
    </>
  )
}

export default Year