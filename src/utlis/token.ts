//封装本地存储token和获取token的api

export const SET_TOKEN = (token:string | null) => {
  localStorage.setItem('TOKEN',(token as string))
}

export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}