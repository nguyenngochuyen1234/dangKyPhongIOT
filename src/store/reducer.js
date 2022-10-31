import { SET_EMAIL, SET_ID, SET_INFOR_FORM, SET_DAYJS_DEFAULT, SET_DATA_HOUR,
     SET_DAYJS, SET_DATA_TIME,SET_ID_USER, SET_CLASS_NAME,SET_ALL_USER,
      SET_LIST_LINK, SET_LIST_URL, SET_TIMES, SET_AVATAR} from "./constants";
import data from "../data";
const dayjs = require('dayjs')
const initState = {
    email: "",
    id: "",
    inforForm:{},
    dayjsDefault:dayjs(),
    data: data,
    dayjs:dayjs(),
    dataTime:{},
    idUser:'',
    className:'week',
    allUser:[],
    listLink:[],
    listUrl: [],
    listTime:[],
    avatar:''


}

function reducer(state, action){
    switch (action.type){
        case SET_EMAIL:
            return{
                ...state,
                email: action.payload
            }
        case SET_ID:
            return{
                ...state,
                id: action.payload
            }
        case SET_INFOR_FORM:
            return{
                ...state,
                inforForm: action.payload
            }
        case SET_DAYJS_DEFAULT:
            return{
                ...state,
                dayjsDefault: action.payload
            }
        case SET_DAYJS:
            return{
                ...state,
                dayjs: action.payload
            }
        case SET_DATA_HOUR:
            return{
                ...state,
                dayjsDefault: action.payload
            }
        case SET_DATA_TIME:
            return{
                ...state,
                dataTime: action.payload
            }
        case SET_ID_USER:
            return{
                ...state,
                idUser: action.payload
            }
        case SET_CLASS_NAME:
            return{
                ...state,
                className: action.payload
            }
        case SET_ALL_USER:
            return{
                ...state,
                allUser: action.payload
            }
        case SET_LIST_LINK:
            return{
                ...state,
                listLink: action.payload
            }
        case SET_LIST_URL:
            return{
                ...state,
                listUrl: action.payload
            }
        case SET_TIMES:
            return{
                ...state,
                listTime: action.payload
            }
        case SET_AVATAR:
            return{
                ...state,
                avatar: action.payload
            }
    }
}
export {initState}
export default reducer