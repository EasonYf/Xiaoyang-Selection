//获取当前时间的方法

export const getTime = () => {
  let hours = new Date().getHours()
  if(hours < 12) return "早上好"
  else if(hours < 17) return "下午好"
  else return "晚上好"
}