<template>
  
  <!-- Bulma: menu tabs -->
  <div class="tabs is-centered">
    <ul>
      <!-- utilisation des menulist et chemin d'accès créés en dessous -->
      <li v-for="menu in menulist" :key="menu.name" :class="{ 'is-active': currentRoute === menu.route }">
          <router-link :to="menu.route"> {{menu.menuname}} </router-link>
      </li>
    </ul>
  </div>
  <!-- end Bulma: menu tabs -->
  <router-view />
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      // création des différents onglets Vue et chemin d'accès
      menulist:[
        {
          menuname:"Accueil",
          route:"/"
        },
        { 
          menuname:"Carte 2D",
          route:"/carte2D"
        },
        { 
          menuname:"Carte 3D",
          route:"/carte3D"
        }
      ] 
    }
  },
  computed: {
    currentRoute(){
      return this.$route.path;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #30669c;
  margin-top: 10px;
  height: 100%;
  width: 100%;
}

</style>