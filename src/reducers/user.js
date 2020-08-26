let initialState = { isUserLogin: false, uid: '', name: '', email: '', sch_id: '', std: '', div: '', roll_no: '' }

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Is_Authenticated':
      return Object.assign({}, state, isAuthenticated(state, action.payload))
    case 'Is_Logout':
      return initialState
    default:
      return state
  }
}

function isAuthenticated(state, payload) {
  //Handle Api call accourdingly send response
  if (payload.uid) {
    return payload
  }
  return {}
}

function setLogout(state, payload) {
  if (payload.response === 'Logout Successfully') {
    return { isUserLogin: false, uid: '', name: ' ', email: '', sch_id: '', std: '', div: '', roll_no: '' }
  }
  return state
}