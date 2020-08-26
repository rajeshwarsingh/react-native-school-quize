import { getSubjectsCwApi, getChaptersCwApi, generatePaperCwApi } from '../api';
import { Subjects_Cw, Chapters_Cw, Generate_Paper_Cw, Check_Allowed_Cap_Count_Cw, Update_Cap_Count_Cw } from './actionTypes';

export function getSubjectsCw(std, cb) {
  return dispatch => {
    getSubjectsCwApi(std).then(result => {
      let data = { type: Subjects_Cw, payload: result }
      dispatch(data)
      cb(null, result)
    })
  }
}

export function getChaptersCw(subject, cb) {
  return dispatch => {
    return getChaptersCwApi(subject).then(result => {
      let data = { type: Chapters_Cw, payload: result }
      dispatch(data)
      cb(null, result)
    })
  }
}

export function generatePaperCw(subject, chapter) {
  return dispatch => {
    return generatePaperCwApi(subject, chapter).then(result => {
      let data = { type: Generate_Paper_Cw, payload: result }
      dispatch(data)
    })
  }
}