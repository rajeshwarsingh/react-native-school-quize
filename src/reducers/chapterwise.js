import { Subjects_Cw, Chapters_Cw, Generate_Paper_Cw } from '../actions'

let initialState = { subjects: [], chapters: [], papers: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case Subjects_Cw:
      return Object.assign({}, state, getSubjectsCw(state, action.payload))

    case Chapters_Cw:
      return Object.assign({}, state, getChaptersCw(state, action.payload))

    case Generate_Paper_Cw:
      return Object.assign({}, state, generatePaperCw(state, action.payload))

    default:
      return state
  }
}

function getSubjectsCw(state, subjects) {
  //Handle api response and send the desire result or Message
  return { subjects }
}

function getChaptersCw(state, chapters) {
  return { chapters }
}

function generatePaperCw(state, papers) {
  return { papers }
}