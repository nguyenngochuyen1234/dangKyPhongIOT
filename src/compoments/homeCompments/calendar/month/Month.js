import React from 'react'
import Squaremonth from './Squaremonth'
const Month = ({state,dayjsDefault, dispatch}) => {

  return (
    <div className='calendar'>
        <h2> Tháng {dayjsDefault.month()+1}</h2>
        <table className='month-form'>
            <thead>
                <tr style={{backgroundColor:"#fafafa",color:"#002E94"}}>
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
              <Squaremonth  state={state} dayjsDefault={dayjsDefault} dispatch={dispatch}/>
            </tbody>
        </table>
    </div>
  )
}

export default Month