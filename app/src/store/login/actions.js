export default {
  authUser (context, payload) {
    context.commit('AUTH_USER', payload)
  }
}
