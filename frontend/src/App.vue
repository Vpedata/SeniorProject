<template>
  <div id="app" class = "full-screen">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.full-screen{
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
}
</style>
