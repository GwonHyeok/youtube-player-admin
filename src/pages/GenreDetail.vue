<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">

          <!-- BreadCrumb -->
          <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li @click="$router.push('/')"><a>장르</a></li>
              <li @click="$router.go(-1)"><a>리스트</a></li>
              <li class="is-active"><a>상세보기</a></li>
            </ul>
          </nav>

          <!-- 제목 -->
          <div class="field">
            <label class="label">제목</label>
            <div class="control">
              <input class="input" type="text" v-model="genre.title" placeholder="제목을 입력해주세요">
            </div>
          </div>

          <!-- 상태 -->
          <div class="field">
            <label class="label">타입</label>
            <div class="control">
              <div class="select">
                <select v-model="genre.states">
                  <option v-for="state in states" v-bind:key="state.value" v-bind:value="state.value">{{state.label}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 이미지 업로드 -->
          <div class="field">
            <label class="label">썸네일</label>
            <div>
              <img class="thumbnail" :src="genre.thumbnailUri"/>
            </div>
            <div class="control">
              <div class="file has-name">
                <label class="file-label">
                  <input class="file-input" type="file" name="attachment" @change="updateAttachment">
                  <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    파일을 선택해주세요…
                  </span>
                </span>
                  <span class="file-name">
                    <span v-if="file">{{file.name}}</span>
                    <span v-else-if="genre && genre.thumbnailUri">{{genre.thumbnailUri}}</span>
                </span>
                </label>
              </div>
            </div>
          </div>

          <!-- 버튼 -->
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click="submitGenre">
                <span v-if="!isEdit">저장</span>
                <span v-else>업데이트</span>
              </button>
            </div>
            <div class="control">
              <button class="button is-light" @click="$router.back()">취소</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import apiClient from '@/network/apiClient'

  export default {
    name: "GenreDetail",
    props: {
      id: String
    },
    async created() {
      if (parseInt(this.id) !== -1) {
        await this.fetchGenre()
      }
    },
    computed: {
      isEdit() {
        return parseInt(this.id) !== -1
      }
    },
    data() {
      return {
        genre: {},
        states: [
          { label: '작성중', value: 'Draft' },
          { label: '공개', value: 'Published' },
          { label: '저장됨', value: 'Archived' },
          { label: '삭제됨', value: 'Deleted' }
        ],
        file: null
      }
    },
    methods: {
      async fetchGenre() {
        const { data } = await apiClient.get(`/genres/${this.id}`);
        this.genre = data.data
      },
      async submitGenre() {
        if (this.isEdit) {
          await this.updateGenre()
        } else {
          await this.saveGenre()
        }
        this.$router.back()
      },
      async updateGenre() {
        const formData = new FormData();
        if (this.file) formData.append('thumbnail', this.file);
        Object.keys(this.genre).forEach(key => formData.append(key, this.genre[key]));

        await apiClient.put(`/genres/${this.id}`, formData)
      },
      async saveGenre() {
        const formData = new FormData();
        if (this.file) formData.append('thumbnail', this.file);
        Object.keys(this.genre).forEach(key => formData.append(key, this.genre[key]));

        await apiClient.post(`/genres`, formData)
      },
      async updateAttachment(event) {
        const file = event.target.files[0];
        if (file) this.file = file
      }
    }
  }
</script>

<style scoped>
  .thumbnail {
    max-width: 120px;
  }
</style>
