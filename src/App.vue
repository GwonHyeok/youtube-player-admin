<template>
  <div id="app">
    <nav class="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="$router.push('/')">
          <p class="title is-5">My Youtube Player</p>
        </a>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" @click="$router.push('/songs')">
              음악
            </a>
            <a class="navbar-item" @click="$router.push('/genres')">
              장르
            </a>
          </div>
        </div>
      </div>
    </nav>


    <router-view class="my-container"/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .my-container {
    margin-top: 2.4rem;
  }
</style>
