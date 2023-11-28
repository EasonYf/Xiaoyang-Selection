import {defineStore} from 'pinia'
import type{ loginForm, loginResponseData } from '@/api/user/type.ts'
import { reqLogin } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utlis/token'
import { UserState } from './types/type'
import { constantRoute } from '../../router/routes'
//创建user仓库
let useUserStore = defineStore('user',{
  //user所用到的数据
  state:(): UserState => {
    return {
      token:GET_TOKEN(),
       //用户唯一的token值
       menuRoutes:constantRoute
    }
  },

  //异步|逻辑
  actions:{
    //发送登录请求
    async userLogin(data:loginForm){
      const result:loginResponseData = await reqLogin(data)
      if(result.code == 200){
        //本地存储持久化一份 存储token
        SET_TOKEN(result.data.token)
        return 'ok'
      }
      else{
        return Promise.reject(new Error(result.data.message))
      }
     
    }
  },
  //读取数据
  getters:{
  }
})

export default useUserStore