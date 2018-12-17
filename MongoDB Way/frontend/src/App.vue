<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
    beforeCreate(){
    this.$store.dispatch('fetchTheaters')
    this.$store.dispatch('fetchMovies')
    this.$store.dispatch('fetchAttendees')
    this.$store.dispatch('fetchShop')
  },
}
</script>


<style lang="scss">
#app{
  background-color: #161616;
  font-family: 'Signika', sans-serif;
  h2{
    font-size: 28px;
    text-align: center;
    padding: 5px 0px;
    color: #a28b53;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
</style>
