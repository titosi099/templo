export default {
  'AUTH_USER' (state, payload) {
    if (payload) {
      state.user = payload.user
      state.token = payload.token
    } else {
      state.user = null
      state.token = null
    }
  }
}

