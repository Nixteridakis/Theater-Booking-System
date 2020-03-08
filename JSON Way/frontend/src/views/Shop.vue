<template>
    <div id="shop">
            <app-navbar></app-navbar>
            <app-header></app-header>
            <h2>Browse our Catalogue</h2>
            <div class="shop-container">
                <ul>
                    <li v-for="(item, key) in renderShop" :key="key" >
                       <p>{{ item.name }}</p> 
                       <p>€{{ item.price }}</p>
                    </li>
                </ul>
            </div>

    </div>
</template>

<script>
export default{
    computed: {
        renderShop(){
            return this.$store.state.shop
        }
    }
}
</script>


<style lang="scss">
#shop{
    display: grid;
    grid-template-columns: repeat(1, minmax(500px, 960px));
    justify-content: center;
    padding-bottom: 90px;

    h2{
        padding-top: 5px;
        padding-bottom: 25px;
    }
    .shop-container{
        ul{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px 30px;
            width: 330px;
            text-align: center;
            margin: 0 auto;
            list-style-type: none;
            padding: 0;

            li{
                color: white;
                border: 1px solid #a28b53;
                padding: 0 15px;
                border-radius: 2px;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                transition: color 0.3s ease-in-out;
                transition: background-color 0.3s ease-in-out;
                &:hover{
                    color:black;
                    background-color: #a28b53;
                }
            }
        }
    }
}
</style>
