<template>
  <div>
  <section class="hero is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-spaced">
          Outils de validation pour les nouvelles contructions 
        </h1>
        <h2 class="subtitle">
          Interface 2D + 3D
        </h2>
      </div>
    

  <label for="site-search">Search the site:</label>
  <input type="search" id="file-input" aria-label="Search through site content">
  <button v-on:click="import_projet(coucou)()">Search</button>

  </div>
  </section>
  


  <section class="section">
    <div class="container" style="text-align: left">
      <h1 class="title is-spaced">Description du Projet</h1>
        <h2 class="subtitle">  
          Pour ce projet, il nous a été demander de développer une petite application web de type "géoportail". 
          Ci-dessous, quelques points spécifiques qui nous ont été demandé :
        </h2>

        <ul class="block-list" style="color: black">
          <li>- Le développement doit se faire avec vue.js</li>
          <li>- Intégrer une librairie avec des composants</li>
          <li>- Menu d'accueil permettant d'afficher des couches spécifiques selon les désirent de l'utilisateur</li>
          <li>- Pages affichants des données géographiques en 2D et 3D (OpenLayers et Cesium)</li>
          <li>- Une page statique décrivent le projet, les outils et l'équipe</li>
          <li>- Le projet doit être contrôlé et stocké sur Github</li>
        </ul>  
    </div>
  </section>

  <section class="section">
    <div class="container" style="text-align: left">
      <h1 class="title is-spaced">Outils Développés</h1>
        <h2 class="subtitle">  
          Pour respecter ces contraintes, nous avons choisi de développé un site web 2D et 3D intéractif ayant une utilitée pour notre métier. 
          Un outil de validation de nouvelles constructions selon les contraintes liées à l'aménagement du territoire et de la mensuration officielle (MO). 
          L'utilisateur pourra introduire son projet (par ex. bâtiment) dans le site web, visualiser son emplacement en 2D et 3D, soit son intégration dans l'environnement construit. 
          Il pourra ensuite contrôler si la construction respecte les contraintes d'aménagement du territoire en appuyant sur un bouton de validation. 
          Le site web retournera ensuite différentes informations. Par exemple :
        </h2>

        <ul class="block-list" style="color: black">
          <li>- Nom du projet</li>
          <li>- Surface de la construction</li>
          <li>- Validation que la construction se situe à l'intérieur d'une aire d'implantation --> validé ou fausse</li>
        </ul>  
    </div>
  </section>



  <section class="section">
    <div class="container" style="text-align: left">
      <h1 class="title is-spaced">L'Equipe</h1>
        <h2 class="subtitle">  
          L'équipe qui à travaillé sur ce projet est composée de trois étudiants en Master (MDT) : Bosson Adrien, Bobillier Quentin, Chevrier Méric. L'ensemble des tâches ont été effectuée en collaboration entre les trois étudiants. Le développement s'est déroulé lors du 3ème semestre du cursus (semestre d'automne 2020).

        </h2>
    </div>
  </section>


  </div>
</template>

<script>
import axios from "axios";
import * as import_projet from './import_projet.js';

export default {
  data(){
    return{
      hellomessage:"Police de construction - Commune de Bramois",
      info : null,
      recherche_barre:null
    }
  },

  methods: {
    
    import_projet : import_projet.import_json,
    
    recherche () {
      this.recherche_barre=document.getElementById('site-search');
      console.log(this.recherche_barre);
      axios
        .get('https://api3.geo.admin.ch/rest/services/api/SearchServer?features=ch.swisstopo-vd.ortschaftenverzeichnis_plz&type=featuresearch&searchText=bramois')
        .then(response => (console.log(this.info = response)))
      

    },

    coucou (arg) {
      console.log(arg)
    },

    import_json(callback) {
  var jsonfile=document.getElementById('file-input');
    jsonfile.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        callback(contents);
      };
      reader.readAsText(file);
    }, false)
    jsonfile.click();
}


  }
}
</script>




<style scoped>
#body {
  height: 90%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: url('../../../src/assets/Bramois.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>