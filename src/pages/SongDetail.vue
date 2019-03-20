<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">

          <!-- BreadCrumb -->
          <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li @click="$router.push('/')"><a>음악</a></li>
              <li @click="$router.go(-1)"><a>리스트</a></li>
              <li class="is-active"><a>상세보기</a></li>
            </ul>
          </nav>

          <!-- 제목 -->
          <div class="field" v-if="isEdit">
            <label class="label">제목</label>
            <div class="control">
              <input class="input" type="text" v-model="song.title" placeholder="제목을 입력해주세요">
            </div>
          </div>

          <!-- 비디오 아이디 -->
          <div class="field">
            <label class="label">비디오 아이디</label>
            <div class="control">
              <input class="input" type="text" v-model="song.videoId" placeholder="비디오 아이디">
            </div>
          </div>

          <!-- 장르 -->
          <div class="field">
            <label class="label">장르</label>
            <div class="control">
              <div class="select">
                <select v-model="song.GenreId">
                  <option v-for="genre in genres" v-bind:key="genre.id" v-bind:value="genre.id">{{genre.title}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 상태 -->
          <div class="field">
            <label class="label">상태</label>
            <div class="control">
              <div class="select">
                <select v-model="song.states">
                  <option v-for="state in states" v-bind:key="state.value" v-bind:value="state.value">{{state.label}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 이미지 업로드 -->
          <div class="field" v-if="isEdit">
            <label class="label">썸네일</label>
            <div>
              <img class="thumbnail" :src="song.thumbnailUri"/>
            </div>
            <div class="control" v-if="false">
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
                    <span v-else-if="song && song.thumbnailUri">{{song.thumbnailUri}}</span>
                </span>
                </label>
              </div>
            </div>
          </div>

          <!-- 버튼 -->
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click="submitSong">
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
  import Pagination from "@/components/Pagination";

  export default {
    name: "SongDetail",
    components: { Pagination },
    props: {
      id: String
    },
    async created() {
      await this.fetchGenre();
      if (parseInt(this.id) !== -1) {
        await this.fetchSong()
      }
    },
    computed: {
      isEdit() {
        return parseInt(this.id) !== -1
      }
    },
    data() {
      return {
        song: {},
        genres: [],
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
        const { data } = await apiClient.get('/genres');
        this.genres.push(...data.data);
      },
      async fetchSong() {
        const { data } = await apiClient.get(`/songs/${this.id}`);
        this.song = data.data
      },
      async submitSong() {
        // 음악 정보 업데이트 비디오 아이디 확인해서 링크 형식일때 비디오 아이디로 치환
        if (this.song.videoId.includes('http://') || this.song.videoId.includes('https://')) {
          const search = this.song.videoId.substring(this.song.videoId.indexOf("?"));
          const assoc = {};
          const decode = function(s) {
            return decodeURIComponent(s.replace(/\+/g, " "));
          };
          const queryString = search.substring(1);
          const keyValues = queryString.split('&');

          for (let i in keyValues) {
            let key = keyValues[i].split('=');
            if (key.length > 1) {
              assoc[decode(key[0])] = decode(key[1]);
            }
          }

          if (!assoc.v) {
            alert('지원하지 않는 유투브 주소 형식입니다');
            return;
          }

          this.song.videoId = assoc.v;
        }

        if (this.isEdit) {
          await this.updateSong()
        } else {
          await this.saveSong()
        }
        this.$router.back()
      },
      async updateSong() {
        await apiClient.put(`/songs/${this.id}`, this.song)
      },
      async saveSong() {
        await apiClient.post(`/songs`, this.song)
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
