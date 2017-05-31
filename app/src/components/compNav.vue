<template>
  <div>
    <nav class="nav has-shadow" id="top">
      <div class="nav-left">
        <a class="nav-item">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </a>
      </div
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <router-link to="/"class="nav-item is-tab">Home</router-link>
        <router-link to="/members" class="nav-item is-tab" >Members</router-link>
        <span class="nav-item">
          <a class="nav-item is-tab" @click="logout">Logout</a>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    methods: {
      ...mapActions(['authUser']),
      logout () {
        localStorage.removeItem('autUser')
        this.authUser()
      }
    }
  }
</script>
