<template>
  <div id="app">
    <CompNav v-if="token"/>
    <div class="container" v-if="token">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <transition name="fade">
      <CompLogin v-if="!token"/>
    </transition>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'
import CompLogin from './login/login'
import CompNav from './components/compNav'

export default {
  name: 'app',
  components: {
    CompLogin,
    CompNav
  },
  data () {
    return {
      login: false
    }
  },
  methods: {
    ...mapActions(['authUser'])
  },
  computed: {
    ...mapState({
      token: state => state.login.token
    })
  },
  created: function () {
    if (_.isString(localStorage.getItem('authUser'))) {
      this.authUser(JSON.parse(localStorage.getItem('authUser')))
    } else {
      this.authUser()
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
