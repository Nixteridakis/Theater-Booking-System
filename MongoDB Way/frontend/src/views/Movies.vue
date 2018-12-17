<template>
        <div id="theater-movies">
        <app-navbar></app-navbar>
        <app-header></app-header>
        <h2>Now in Theaters</h2>
        <div class="movies-container">
            <ul>
                <li v-for="(movie, key) in renderMovies" :key="key">
                    <div class="movie-image" :style="{ backgroundImage: `url('${movie.Poster}')` }"></div>
                    <div class="movie-label">{{movie.Name}}</div>
                </li>
            </ul>
        </div>
        </div>
</template>

<script>

export default {
    computed: {
        renderMovies(){
            return this.$store.state.movies
        }
    }
}
</script>



<style lang="scss">
#theater-movies{
    display: grid;
    grid-template-columns: repeat(1, minmax(500px, 960px));
    justify-content: center;    
    
    .movies-container{
        ul{
            display: grid;
            grid-template-columns: repeat(3,180px);
            grid-gap: 25px 110px;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            padding: 20px;
            margin:0;
            color: white;
            li{
                display: flex;
                flex-direction: column;
                .movie-image{
                    background-repeat: no-repeat;
                    max-width: 100%;
                    height: 270px;
                }
                .movie-label{
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    padding: 10px;
                    margin-bottom:10px;
                    background-color: #202020;
                    color:#bba263;

                }
            }
        }
    }
}
    
</style>
