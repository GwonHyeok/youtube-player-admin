<template>
  <div>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <ul class="pagination-list" v-if="paging">
        <li v-for="page in numberOfPage" v-bind:key="page" v-on:click="onClickPage(page + startPage - 1)">
          <a :class="{'is-current': paging.current === page + startPage - 1}" class="pagination-link"
             :aria-label="`Page ${page + startPage - 1}`" aria-current="page">
            {{page + startPage - 1}}
          </a>
        </li>
      </ul>
      <ul class="pagination-list" v-else>
        <li><a class="is-current pagination-link" aria-label="1" aria-current="page">1</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    computed: {
      startPage() {
        if (!this.paging) return 1
        if (this.paging.current < this.maxShowingPage) return 1
        if (this.paging.max - 2 < this.paging.current) return this.paging.max - this.numberOfPage + 1
        return this.paging.current - 2
      },
      numberOfPage() {
        if (!this.paging) return 1
        return Math.min(this.paging.max, this.maxShowingPage)
      }
    },
    data() {
      return {
        maxShowingPage: 5
      }
    },
    methods: {
      onClickPage(page) {
        this.$emit('page', page)
      }
    },
    props: {
      paging: {}
    }
  }
</script>

<style scoped>

</style>
