<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-6">
            <button class="button is-fullwidth" @click="$router.push('/genres')">장르</button>
          </div>
          <div class="column is-6">
            <button class="button is-fullwidth" @click="$router.push('/songs')">음악</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import apiClient from '../network/apiClient'

  export default {
    name: 'Home',
    async created() {
      await this.userCheck()
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      async userCheck() {
        const token = sessionStorage.getItem('token');

        // 로그인 체크
        if (token == null) {
          alert('로그인을 해주세요');
          this.$router.push('/login');
          return
        }

        // Header 업데이트
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ME 요청
        const { data } = await apiClient.get('/me');
        const user = data.data;

        // 관리자가 아닐 경우 로그인 화면으로 이동
        if (user.role !== 'admin') {
          alert('관리자가 아닙니다');
          sessionStorage.clear();
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
