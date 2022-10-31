import React, { useEffect, useState } from 'react'
import Squareweek from '../week/Squareweek'
import { actions } from '../../../../store'
import {useNavigate} from "react-router-dom" 
import './style.css'
const Squaremonth = ({state, dayjsDefault, dispatch}) => {

    const [firstDateOfMonth, setFirstDateOfMonth] = useState(dayjsDefault.startOf('M').startOf('w'))
    const [lastDateOfMonth, setLastDateOfMonth] = useState(dayjsDefault.endOf('M').startOf('w'))

    const navigate = useNavigate();
    console.log({"listLinks":state.listLink,"listUrl":state.listUrl})

  useEffect(()=>{
      setFirstDateOfMonth(dayjsDefault.startOf('M').startOf('w'))
      setLastDateOfMonth(dayjsDefault.endOf('M').startOf('w'))
      dispatch(actions.setDayjsDefault(dayjsDefault))
    },[dayjsDefault])
 

    const handleWeekClicked = (firstDateOfweek) =>{
        dispatch(actions.setDayjsDefault(firstDateOfweek))
        navigate("/home/calendar")
        dispatch(actions.setClassName('week'))

    }

    const weeksOfMonth = [];

    const weekNumberOfTheMonth = (lastDateOfMonth.subtract(1, "week").date() - firstDateOfMonth.add(1, "week").date())/7 + 3

    for(let i = 0;i<weekNumberOfTheMonth;i++){
        weeksOfMonth.push(firstDateOfMonth.add(i, "week"))
    }

    const weeksOfMonthRender = weeksOfMonth.map((firstDateOfweek,id)=>
    <tr className='tr-hover' onClick={()=>handleWeekClicked(firstDateOfweek)} key={id}>
        <Squareweek state={state} firstDateOfWeek={firstDateOfweek} month={dayjsDefault.month()}/>
    </tr>)

  return (
      <>
        {weeksOfMonthRender}
    </>
  )
}

export default Squaremonth