<template>
  <div id='theaters'>
    <app-navbar></app-navbar>
    <app-header></app-header>
    <div id='theater-list'>
      <ul>
        <li v-for="(theater, key) in theaters" :key="key">
          <router-link :to="`/theater/${theater.name}`" exact>
            <div class="theater" :style="{ backgroundImage: `url('${theater.image}')` }" >
            <div class="theater-label">{{theater.name}}</div></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  computed:{
    theaters(){
      return this.$store.state.theaters
    }
  }
}
</script>


<style lang="scss">

#theaters{
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  
  #theater-list ul {
    display: grid;
    list-style-type: none;
    grid-template-columns: repeat(3,minmax(300px,auto));
    grid-template-rows: repeat(3, minmax(250px,auto));
    grid-gap: 40px 25px;
    justify-content: center;
    padding: 20px;
    text-align: center;
    li{
      & :hover {
        cursor:pointer;
        opacity: 0.6;
      }
      a{
        text-decoration: none;
      }
      .theater{
        width:100%;
        height: 100%;
        background-size: 530px;
        background-repeat: no-repeat;
        background: center;
      }
      .theater-label{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 18px;
        color: #202020;
        background-color: white;
      }
    }
  }
}




</style>
