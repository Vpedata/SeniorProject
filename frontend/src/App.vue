<template>
  <div id="app" class = "full-screen amber">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout(){
        $http.get("http://onlineadvisor.tk:3000/auth/logout");      
        $router.push('http://onlineadvisor.tk:3000/#/');
    }
},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff8e1;
}

.full-screen{
    width: 100%;
    height: 100%;
    background-color: #fff8e1;
}

</style>
