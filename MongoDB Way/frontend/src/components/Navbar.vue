<template>
 <nav>
   <router-link to="/movies">Movies</router-link>
   <router-link to="/">Theaters</router-link>
   <router-link to="/shop">Shop</router-link>
 </nav>
</template>

<script>

</script>


<style lang="scss">
nav{
  display: flex;
  justify-content: center;
  border: 2px solid  #202020;
  padding: 8px;
  margin-bottom:5px;
  color:#a28b53;
  font-size: 14px;
  text-align: center;
  a{
    text-decoration: none;
    color: white;
    margin: 0 30px;
    
  }
}
</style>
