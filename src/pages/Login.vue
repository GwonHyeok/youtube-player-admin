<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">로그인</h3>
            <p class="subtitle has-text-grey">로그인이 필요합니다.</p>
            <div class="box">
              <form @submit.prevent="doLocalLogin">
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="email" placeholder="아이디" autofocus="" v-model="username">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="password" placeholder="비밀번호" v-model="password">
                  </div>
                </div>
                <button class="button is-block is-info is-medium is-fullwidth" @click="doLocalLogin">로그인</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import apiClient from '../network/apiClient'

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async doLocalLogin() {
        try {
          const response = await apiClient.post(`/login`, { username: this.username, password: this.password });
          sessionStorage.setItem('token', response.data.data.token);
          sessionStorage.setItem('type', response.data.data.type);
          this.$router.push(`/`)
        } catch (e) {
          alert(e.message)
        }
      }
    }
  }
</script>

<style scoped>

</style>
