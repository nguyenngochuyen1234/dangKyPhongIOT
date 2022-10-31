import React, { useEffect, useState } from 'react'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

const Avatargroup = ({state, arrayId}) => {
    var arrayChild = {arr1:'',arr2:''}
    function findImage (id){
        return (state.listUrl.filter(function(url){
          return url.id===("images/"+id)
        }))
      }
    
    const arrayUrl = arrayId.map(id=>{
        let item = findImage(id)
        return item[0].link
    })

        const arr1 = arrayUrl.slice(0,2)
        if(arrayUrl.length>2){
            const arr2 = arrayUrl.slice(2)
            arrayChild =  {arr1,arr2}
        }

    // console.log(arr1)
  return (
    <>
            <Avatar.Group
            maxCount={2}
            size="small"
            maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
            }}
            >
            {
                arr1.map((url,idx)=><Avatar key={idx} src={url} />)
            }
            
            {arrayUrl.length>2&&<Tooltip title="Ant User" placement="top">
                <Avatar src={arrayChild.arr2[0]} />
            </Tooltip>}
                {arrayUrl.length>3&&arrayChild.arr2.slice(1).map((url,idx)=><Avatar key={idx} src={url} />)}
        </Avatar.Group>
    </>
  )
}

export default Avatargroup