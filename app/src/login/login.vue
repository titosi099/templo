<template>
    <div id="appLogin" class="login-wrapper columns">
    <div class="column is-8 is-hidden-mobile hero-banner">
      <section class="hero is-fullheight is-dark">
        <div class="hero-body"></div>
        <div class="hero-footer">
          <p class="has-text-centered">Image © Glenn Carstens-Peters via unsplash</p>
        </div>
      </section>  
    </div>
    <div class="column is-4">
      <section class="hero is-fullheight">
        <div class="hero-heading">
          <div class="section has-text-centered">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" width="150px">
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <h1 class="avatar has-text-centered section">
                  <img src="https://placehold.it/128x128">
                </h1>
                <div class="login-form">
                  <form v-on:submit.prevent="doLogin">
                    <div class="field">
                      <p class="control has-icons-left">
                        <input class="input email-input" style="border-radius:10px" type="text" v-model="user.login" placeholder="Login">
                        <span class="icon is-small is-left">
                          <i class="fa fa-user"></i>
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control has-icons-left">
                        <input class="input" style="border-radius:10px" type="password" v-model="user.senha" placeholder="Password">
                        <span class="icon is-small is-left">
                          <i class="fa fa-lock"></i>
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control login">
                        <button class="button is-success is-outlined is-medium is-fullwidth">Login</button>
                      </p>
                    </div>
                  </form>
                </div>
                <div class="section forgot-password">
                  <p class="has-text-centered">
                    <a href="#">Forgot password</a>
                    <a href="#">Need help?</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'appLogin',
  data () {
    return {
      user: {
        login: '',
        senha: ''
      }
    }
  },
  methods: {
    ...mapActions(['authUser']),
    doLogin () {
      this.axios.post('http://localhost:3000/login', this.user)
        .then(response => {
          this.authUser(response.data)
          localStorage.setItem('authUser', JSON.stringify(response.data))
        })
        .catch(() => console.log('Não autorizado'))
    }
  }
}
</script>
<style>
html,body {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  height: 100%;
  padding: 0;
  margin: 0;
}

.icon.user,
.icon.password {
  margin: 5px 10px 0 0;
}

.avatar img {
  border-radius: 100px;
  padding: 5px;
  border: 1px solid #dbdbdb;
}

.forgot-password a {
  color: #95A5A6;
  font-weight: bold;
  padding-right: 20px;
}

.login {
  padding-top: 10px;
}

.login button {
  border-radius: 10px;
  font-weight: bold;
}

.hero-body .container {
  margin-top: -100px;
}

.hero.is-dark .section {
  background-color: transparent;
}

.login-wrapper {
  margin: -0.75rem;
  overflow-y: hidden;
}

.hero-banner .hero {
  background: url('https://unsplash.it/2000/?image=885');
  background-position: center;
  background-size: cover;
  background-blend-mode: screen;
}

.hero-banner .title {
  display: inline-block;
  background-color: rgba(0,0,0, 0.6);
  padding: 5px;
}
</style>
