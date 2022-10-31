import {SET_EMAIL, SET_ID, SET_INFOR_FORM, SET_DAYJS, SET_DAYJS_DEFAULT, SET_DATA_HOUR, 
    SET_DATA_TIME,SET_ID_USER, SET_CLASS_NAME,SET_ALL_USER,SET_LIST_LINK, SET_LIST_URL,
    SET_TIMES,SET_AVATAR

} from "./constants"
export const setEmail = payload =>({
    type: SET_EMAIL,
    payload
})

export const setId = payload =>({
    type: SET_ID,
    payload
})

export const setInforForm = payload =>({
    type: SET_INFOR_FORM,
    payload
})

export const setDayjsDefault = payload =>({
    type: SET_DAYJS_DEFAULT,
    payload
})

export const setDayjs = payload =>({
    type: SET_DAYJS,
    payload
})

export const setDataHour = payload =>({
    type: SET_DATA_HOUR,
    payload
})

export const setDataTime = payload =>({
    type: SET_DATA_TIME,
    payload
})

export const setIdUser = payload =>({
    type: SET_ID_USER,
    payload
})

export const setClassName = payload =>({
    type: SET_CLASS_NAME,
    payload
})

export const setAllUser = payload =>({
    type: SET_ALL_USER,
    payload
})

export const setListLink = payload =>({
    type: SET_LIST_LINK,
    payload
})

export const setListUrl = payload =>({
    type: SET_LIST_URL,
    payload
})


export const setTimes = payload =>({
    type: SET_TIMES,
    payload
})

export const setAvatar = payload =>({
    type: SET_AVATAR,
    payload
})

