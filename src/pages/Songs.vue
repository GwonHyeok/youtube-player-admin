<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">

        <!-- BreadCrumb -->
        <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
          <ul>
            <li><a @click="$router.push('/')">음악</a></li>
            <li class="is-active"><a>리스트</a></li>
          </ul>
        </nav>

        <!-- 리스트 -->
        <table class="table">
          <thead>
          <tr>
            <th>아이디</th>
            <th>제목</th>
            <th>장르</th>
            <th>상태</th>
          </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
          <tr v-for="song in songs" v-bind:key="song.id" @click="onClickSong(song)">
            <td>{{song.id}}</td>
            <td>{{song.title}}</td>
            <td>{{song.Genre.title}}</td>
            <td>{{song.states}}</td>
          </tr>
          </tbody>
        </table>

        <!-- 추가 버튼 -->
        <div class="columns">
          <div class="column is-10">
          </div>
          <div class="column">
            <a class="button is-primary is-fullwidth" @click="onClickAddSong">추가</a>
          </div>
        </div>

      </div>
    </div>
    <pagination :paging="meta.pagination" v-on:page="onChangePage"></pagination>
  </section>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import apiClient from '@/network/apiClient'

  export default {
    name: "Songs",
    components: { Pagination },
    async created() {
      await this.fetchData(this.$route.query.page || 1);
    },
    data() {
      return { songs: [], meta: {} }
    },
    methods: {
      async fetchData(page = 1) {
        const { data } = await apiClient.get('/songs', { params: { page } });
        this.songs = data.data;
        this.meta = data.meta;
      },
      async onChangePage(page) {
        this.$router.replace({ query: { page } });
        await this.fetchData(page)
      },
      onClickSong(song) {
        this.$router.push(`/songs/${song.id}`)
      },
      onClickAddSong() {
        this.$router.push(`/songs/${-1}`)
      }
    }
  }
</script>

<style scoped>

</style>
