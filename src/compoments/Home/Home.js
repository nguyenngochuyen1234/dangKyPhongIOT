import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FieldTimeOutlined,
    UserOutlined,
    CalendarOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Layout, Menu, Popconfirm, message, Image, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import "./style.css"
import {Outlet} from 'react-router-dom'
import {useNavigate} from "react-router-dom"  
import {
  onAuthStateChanged,
} from "firebase/auth";
import Loading from '../../Loading';
import userDataService from '../../services/data.services'
import { actions } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import Usercard from '../homeCompments/userInfor/Usercard';

import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { db,auth,storage } from "../../firebase";

import {
  doc,
  collection,
  setDoc,
  getDocs
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { async } from '@firebase/util';
const { Header, Sider, Content } = Layout;
const Home = ({state,dispatch}) => {

  const [loading, setLoading] = useState(true)
  const [linkAvarta, setLinkAvarta] = useState();

  const [timeList, setTimeList] = useState([])

  const [imageList, setImageList] = useState([])
  const [listId, setListId] = useState([])
  const [links, setLinks] = useState([])
  const [urls, setUrls] = useState([])
  const imageListRef = ref(storage,"images/")



    const logout = async() =>{
      signOut(auth).then(() => {
        localStorage.removeItem("email")
        localStorage.removeItem("allUser")
        localStorage.removeItem("avatar")
        localStorage.removeItem("id")
        localStorage.removeItem("linkAvarta")
        localStorage.removeItem("registered")
        message.success('Đăng xuất thành công')
        navigate("/")
      }).catch((error) => {
        message.error('Đăng xuất thất bại')
      });
    }

    onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("email", currentUser.email);
      localStorage.setItem("id", currentUser.uid);
    });
    const navigate = useNavigate();    
    const fetchUser = async () =>{
        setLoading(true)
        try{
          const allUser = await getDocs(collection(db,"user"))
          setListId(allUser.docs.map((doc) => (doc.id)))
          dispatch(actions.setAllUser(allUser.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
          setLoading(false)
        }catch(err){
          setLoading(false)
        }
      }
      useEffect(()=>{
        fetchUser()
        listAll(imageListRef).then((res)=>{
          res.items.forEach((item) => {
            setLinks((prev) => [...prev,item._location.path_])
            const link = item._location.path_
            // setLinks((prev)=>[...prev,item])
            getDownloadURL(item).then((url)=>{
               setUrls((prev) => [...prev,{link:url,id:item._location.path_}])
              // dispatch(actions.setListUrl((prev) => [...prev,url]))
            })
          })
        })
      },[])

// Lấy tất cả thông tin đăng ký thời gian của người dùng
      const fetchTimesUser = async(id) =>{
        try{
            const timeUser = await getDocs(collection(db,"user/"+id + "/registerTime"))
            const data = timeUser.docs.map((doc) => ( {id: id, ...doc.data()}))
            // console.log(data)
            if(data){
              setTimeList(prev=>([...prev,...data]))
            }
        }catch(err){
          alert(err)
        }
      }

      useEffect(()=>{
        listId.forEach(id=>{
          fetchTimesUser(id)
        })
      },[listId])

      useEffect(()=>{
        if(links.length>0&&urls.length>0){
          dispatch(actions.setListLink(links))
          dispatch(actions.setListUrl(urls))
          let idxLinks;
          links.forEach((link, idx)=>{
            if(link==="images/"+localStorage.getItem("id")){ idxLinks = idx}
          })
          // console.log(idxLinks)
          // console.log(links)
          function findImage (url){
            return url.id===("images/"+localStorage.getItem("id"))
          }
          if(urls.filter(findImage).length>0){
            localStorage.setItem("avatar",urls.filter(findImage)[0].link)
          }
        }
      },[urls])
      
      function getItem( key, icon, label) {
        return {
          key,
          icon,
          label,
        };
      }
      const handleClick = (e) =>{
        if(e.key==='1'){
          navigate("/home/user")
        }else if(e.key==='2'){
          navigate("/home/calendar") 
        }else{
          navigate("/home/registertime") 
        }
      }
      useEffect(()=>{
        if(timeList.length>0){
          dispatch(actions.setTimes(timeList))
          // console.log(timeList)
        }
      },[timeList])
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout>
        {loading&&<Loading />}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={handleClick}
            items={[              
                getItem('1',<UserOutlined />,'Tài khoản'),
                getItem('2',<CalendarOutlined />,'Lịch'),
                getItem('3',<FieldTimeOutlined />,'Đăng ký thời gian'),
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <Avatar
                className='avatar'
                shape="square"
                src={
                  <Image
                    src={localStorage.getItem("avatar")}
                    style={{
                      width: 32,
                      height: 32,
                      backgroundSize: 'cover',
                    }}
                  />
                }
              />
            <h2>Đăng ký sử dụng phòng IOT</h2>
            <Popconfirm
              placement="bottomRight"
              title="Bạn có chắc chắn muốn đăng xuất ?"
              onConfirm={logout}
              okText="Yes"
              cancelText="Cancel"
      >
            <FontAwesomeIcon className='icon-logout' icon={faRightFromBracket} />
      </Popconfirm>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default Home;