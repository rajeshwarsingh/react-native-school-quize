import { combineReducers } from 'redux'
import appReducer from './app'
import userReducer from './user'
import boardPaperCwReducer from './chapterwise'

export default combineReducers({
  count: appReducer,
  user: userReducer,
  boardPaperCw: boardPaperCwReducer,
})
