import React from 'react'
import {LoadingOutlined} from '@ant-design/icons';
const Loading = () => {
    const styles = {
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left:"0",
        zIndex:'99',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    }
    const stylesIconLoading = {
    }
  return (
    <div style={styles}>
        <img src='../image/loading.gif'/>
    </div>
  )
}

export default Loading