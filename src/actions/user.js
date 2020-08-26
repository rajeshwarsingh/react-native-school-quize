import { getLoginInfo, Logout } from '../api';
import { Is_Authenticated, Is_Logout } from './actionTypes';

export function isAuthenticated(body, cb) {
  console.warn(" cb :", cb)
  return dispatch => {
    return getLoginInfo(body).then(result => {
      let data = { type: Is_Authenticated, payload: result }
      dispatch(data)
      console.warn(" data :", cb, data)
      cb(data)
    })
  }
}

export function alreadyAuthenticated(result, cb) {
  return dispatch => {
    let data = { type: Is_Authenticated, payload: result }
    dispatch(data)
    cb(data)
  }
}

export function logout(body, cb) {
  return dispatch => {
    return Logout(body).then(result => {
      let data = { type: Is_Logout, payload: result }
      dispatch(data)
      cb(data)
    })
  }
}

export const actionCreator = (type, payload = null) => ({ type, payload })
