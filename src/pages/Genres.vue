<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">

        <!-- BreadCrumb -->
        <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
          <ul>
            <li><a @click="$router.push('/')">장르</a></li>
            <li class="is-active"><a>리스트</a></li>
          </ul>
        </nav>

        <!-- 리스트 -->
        <table class="table">
          <thead>
          <tr>
            <th>아이디</th>
            <th>제목</th>
            <th>상태</th>
          </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
          <tr v-for="genre in genres" v-bind:key="genre.id" @click="onClickGenre(genre)">
            <td>{{genre.id}}</td>
            <td>{{genre.title}}</td>
            <td>{{genre.states}}</td>
          </tr>
          </tbody>
        </table>

        <!-- 추가 버튼 -->
        <div class="columns">
          <div class="column is-10">
          </div>
          <div class="column">
            <a class="button is-primary is-fullwidth" @click="onClickAddGenre">추가</a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import apiClient from '@/network/apiClient'

  export default {
    name: "Genres",
    components: { Pagination },
    async created() {
      await this.fetchData()
    },
    data() {
      return { genres: [], meta: {} }
    },
    methods: {
      async fetchData() {
        const { data } = await apiClient.get('/genres');
        this.genres = data.data
      },
      onClickGenre(genre) {
        this.$router.push(`/genres/${genre.id}`)
      },
      onClickAddGenre() {
        this.$router.push(`/genres/${-1}`)
      }
    }
  }
</script>

<style scoped>

</style>
