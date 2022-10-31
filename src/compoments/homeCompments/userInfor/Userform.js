import React,{useEffect, useState} from 'react'
import "./user.css"
import {message, Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faBriefcase, faBuilding, faPhone, faUpload, faAddressCard } from '@fortawesome/free-solid-svg-icons'

import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { db, storage } from "../../../firebase";

import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { async } from '@firebase/util';
import { setEmail } from '../../../store/actions';



const Userform = () => {
  var randomColor = require('randomcolor'); // import the script
  const [avatar, setAvatar] = useState()
  const [imageUpload, setImageUpload] = useState(null);

  const [formData, setFormData] = useState({
    name: "",ms: "",img:"",date:"",numberPhone:"",work:"",company:"Đại học Thăng Long",color:randomColor(),email:localStorage.getItem("email")
  })

  const fetchUser = async() =>{
    try{
      const data = await getDoc(doc(db,"user/" + localStorage.getItem("id")))
      if(data.exists()){
        setFormData(data.data())
      }
    }catch(err){
      console.log(err)
    }
  }

  
  const uploadImage = () =>{
    if(!imageUpload) return;
    const imageRef = ref(storage,"images/"+localStorage.getItem("id"))
    uploadBytes(imageRef, imageUpload).then(()=>{
      console.log("image uploaded")
    })
  }
  if(formData.name){
    localStorage.setItem("registered",true)
  }
  useEffect(()=>{
    fetchUser()
  },[])
  const handlePreviewAvatar = (e) =>{
    const file = e.target.files[0]
    setImageUpload(file)
    file.preview = URL.createObjectURL(file)
    setAvatar(file)
    setFormData(prev=>({
      ...prev,
      img:file.preview
    }))
  }

  const handleChange = (e) =>{
    setFormData(prevData =>{
      return({
        ...prevData,
        [e.target.name]:e.target.value
      })
    })
  }  
  const handleSubmit = async (e) =>{

    const newUser = {
      id: localStorage.getItem("id"),
      ...formData,
    };
    try{
      
      if(!formData.name||!formData.ms||!formData.img||!formData.date||!formData.numberPhone||!formData.work||!formData.company){
        message.error('Cập nhật thông tin thất bại!')
      }
      else{
        setDoc(doc(db,"user",localStorage.getItem("id")),formData)
        uploadImage()
        message.success('Cập nhật thông tin thành công!')
      }
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
  <div className='body-user-form'>
    <div className='form-container-user'>
      <h2>Cập nhật thông tin</h2>
      <div className='line'></div>
      <div className='input-container'>
        <p>Họ và tên</p>
        <div className='input-items'>
          <FontAwesomeIcon className='icon' icon={faUser} />
          <input 
            type="text"
            placeholder="Nguyen Ngoc Huyen"
            onChange={handleChange}
            name="name"
            value={formData.name}
            />
        </div>
      </div>

      <div className='input-container'>
        <p>Mã sinh viên/giảng viên</p>
        <div className='input-items'>
          <FontAwesomeIcon className='icon' icon={faAddressCard} />
          <input 
            type="text"
            placeholder="A1234"
            onChange={handleChange}
            name="ms"
            value={formData.ms}
            />
        </div>
      </div>

      <div className='line'></div>
      <div className='input-container'>
        <p>Email</p>
        <div className='input-items'>
        <FontAwesomeIcon className='icon' icon={faEnvelope} />
          <input 
            type="email"
            placeholder="a1234@gmail.com"
            defaultValue={localStorage.getItem("email")}
            />
        </div>
      </div>
      <div className='line'></div>
      <div style={{position:"relative"}} className='input-container'>
        <p>Thêm ảnh của bạn</p>
          {avatar && (
            <img style={{position:"absolute",width:"auto",height:"80%",left:"12rem"}}
             src={formData.img} alt="" width="2rem"/>
          )}
        <div className='input-items input-upload'>
          <button className='upload-file'>
          <FontAwesomeIcon className='icon-upload' icon={faUpload} />
            <input 
              type="file"
              onChange={handlePreviewAvatar}
              />
          </button>
            <h5>Click to upload</h5>
        </div>
      </div>
      <div className='line'></div>
      <div className='input-container'>
        <p>Ngày sinh</p>
        <div className='input-items'>
        <input 
          type="date"
          onChange={handleChange}
          name="date"
          value={formData.date}
          // onFocus = {()=>handleClick("password")}
          />
      </ div>
      </div>
      <div className='line'></div>
      <div className='input-container'>
        <p>Số điện thoại</p>
        <div className='input-items'>
        <FontAwesomeIcon className='icon' icon={faPhone} />
        <input 
          type="text"
          onChange={handleChange}
          name="numberPhone"
          value={formData.numberPhone}
          // onFocus = {()=>handleClick("password")}
          />
      </ div>
      </div>
      
      <div className='line'></div>
      <div className='input-container'>
        <p>Chức vụ</p>
        <div className='input-items'>
        <FontAwesomeIcon className='icon' icon={faBriefcase} />
        <input 
          type="text"
          placeholder='Sinh viên'
          onChange={handleChange}
          name="work"
          value={formData.work}
          // onFocus = {()=>handleClick("password")}
          />
          </div>        
      </div>
      <div className='line'></div>

      <div className='input-container'>
        <p>Đơn vị công tác</p>
        <div className='input-items'>   
        <FontAwesomeIcon className='icon' icon={faBuilding} />
          <input 
            type="text"
            placeholder='Đại học Thăng Long'
            onChange={handleChange}
            name="company"
            value={formData.company}
            // onFocus = {()=>handleClick("password")}
            />
        </div>
      </div>
      <div className='line'></div>
      <div className='btn'>
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  </div>
  )
}

export default Userform