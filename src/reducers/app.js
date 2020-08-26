export default function (state = { app_started: true, authenticated: false }, { type, payload }) {
  switch (type) {
    case 'APP_LOADED':
      return { ...state, authenticated: true }
    default:
      return state
  }
}
