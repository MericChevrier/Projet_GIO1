<template>
  <div id="body">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-warning">
             <p class="title">Commune de Bramois</p>
             <p class="subtitle">Police des constructions</p>
             <p class="is-size-6">cndjwivbfiuvbeijvfnivbaijvnfejbfi</p>
            </article>
            <article class="tile is-child box">
             <p class="title">Projet GI01</p>
             <figure class="image is-16by9">
                <img src="../../../src/assets/hes-so-master.png">
              </figure>
           </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Description de l'équipe</p>
              <p class="subtitle">xxx</p>
              <p class="is-size-6">cdwnvjibviuqrenijfndc jdnveiufbiuewncjsdnciurb</p>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-danger">
            <p class="subtitle-7">Copyright</p>
            <p class="is-size-7">Développé par A.Bosson, M.Chevrier et Q.Bobillier @SP2020MDT</p>
            <div class="content">
            <!-- Content -->
            </div>
          </article>
        </div>
     </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">Notice d'utilisation</p>
            <p class="subtitle">Carte 2D</p>
            <p class="is-size-6">cdwnvjibviuqrenijfndc jdnveiufbiuewncjsdnciurb</p>
            <p class="subtitle">Carte 3D</p>
            <p class="is-size-6">cdwnvjibviuqrenijfndc jdnveiufbiuewncjsdnciurb</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  data(){
    return{
      hellomessage:"Police de construction - Commune de Bramois"
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