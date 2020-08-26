export function getLoginInfo(body) {
  let { uid, pwd } = body

  return new Promise((resolve, reject) => {
    if (uid === 'user' && pwd === 'password') return resolve({ uid: 'user', name: 'abc', email: 'abc@gmail.com', sch_id: '123', std: "X", div: 'A', roll_no: 1 })
    else return resolve({})
  })
}

export function Logout(body) {
  //write a api to logout
  return new Promise((resolve, reject) => {
    resolve({ response: 'Logout Successfully' })
  })
}
