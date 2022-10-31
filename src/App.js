import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './compoments/account/Register'
import Login from './compoments/account/Login'
import Home from './compoments/Home/Home'
import User from './compoments/homeCompments/user/User'
import Registertime from './compoments/homeCompments/registerTime/Registertime'
import Calendar from './compoments/homeCompments/calendar/Calendar'
import { useStore } from './store'
import Week from './compoments/homeCompments/calendar/week/Week'
import Year from './compoments/homeCompments/calendar/year/Year'
import Month from './compoments/homeCompments/calendar/month/Month'
const App = () => {
  const [state, dispatch] = useStore()
  const {email, password, inforForm} = state
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="home" element={<Home state={state} dispatch={dispatch}/>}>
        <Route path="user" element={<User />}/>
        <Route path="calendar" element={<Calendar state={state} dispatch={dispatch}/>}>
          <Route path="month" element={<Month state={state} dayjsDefault={state.dayjsDefault} dispatch={dispatch}/>}/>
          <Route path="year" element={<Year state={state} dispatch={dispatch} firstDayOfYear={state.dayjsDefault.startOf('y')}/>}/>
        </Route>
        <Route path="registertime" element={<Registertime state={state} dispatch={dispatch}/>}/>
      </Route>
    </Routes>
  )
}

export default App