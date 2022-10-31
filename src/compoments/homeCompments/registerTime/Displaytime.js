import { Space, Table, Tag, Popconfirm  } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import Loading from '../../../Loading';
import { async } from '@firebase/util';


const { Column, ColumnGroup } = Table;


  const Registertime = () => {

    const handleDelete = async(key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        await deleteDoc(doc(db, "user/"+localStorage.getItem("id")+"/registerTime", key));
        window.location.reload()
      };

    const [dataSource, setDataSource] = useState()

    const [loading, setLoading] = useState(true)
        
        
    const fetchTimeData = async() =>{
        try{
            const data = await getDocs(collection(db,"user/" + localStorage.getItem("id")+"/registerTime"))
            setDataSource(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        fetchTimeData();
    },[])
     
    return <>
            {loading&&<Loading />}
            <Table dataSource={dataSource}>
            <Column
                title="Ngày trong tuần"
                dataIndex="days"
                key="days"
                render={(tags) => (
                <>
                    {tags.map((tag) => (
                    <Tag color="purple" key={tag}>
                        {tag}
                    </Tag>
                    ))}
                </>
                )}
            />
            <Column
                title="Giờ trong ngày"
                dataIndex="hours"
                key="hours"
                render={(tags) => (
                <>
                    {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                        {tag}
                    </Tag>
                    ))}
                </>
                )}
            />
            <Column title="Ngày bắt đầu" dataIndex="dayStart" key="dayStart" />
            <Column title="Ngày kết thúc" dataIndex="dayEnd" key="dayEnd" />
            <Column
                title="Xóa"
                key="action"
                render={(_,record) => (
                    <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                        </Popconfirm>
                    </Space>
                )}
                />
            </Table>
    </>
  };
  export default Registertime;