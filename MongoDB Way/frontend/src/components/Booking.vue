<template>
<div class="overlay">
    <div class="booking-container">
        <div v-if="registered">
            <span @click.prevent="$emit('clearBooking')" class="close">&times;</span>
            <h3>Reserve your seat for</h3>
            <h3>{{ currentBooking.Name }}</h3>
            <form>
                <input type="text" v-model="name" placeholder="Full Name">
                <input type="text" v-model="age" placeholder="Age">
                <p class="shop-tag">Shop Online</p>
                <div class="checkboxes">
                    <div class="shop-grid">
                        <label v-for="(item, key) in loadShopItems" :key="key" for="">
                            {{item.name}}
                            <input type="checkbox" v-model="shopItems" :value="item.name"></label>
                    </div>
                </div>
             <button @click.prevent="handleBooking">Submit</button>
            </form>
        </div>
        <div v-if="!registered" class="successful">
            <p>Your Booking has been successful!</p>
            <button @click="printPDF">Print PDF</button>
        </div>
    </div>
    </div>
</template>

<script>
import PDF from '../pdfprint'
export default{
    props : ['currentBooking','theater'],
    data(){
        return{
            name: '',
            age: '',
            shopItems: [],
            itemsObj: {},
            registered : true
        }
    },
    computed: {
        loadShopItems(){
            return this.$store.state.shop
        }
    },
    methods: {
        handleBooking(){
            const items = this.shopItems
            const itemObj = items.map(shoppedItem => {
                const res = this.$store.state.shop.find(stateItem => {
                    return stateItem.name == shoppedItem
                })
                return res
            })
            this.itemsObj = itemObj
            this.$store.dispatch({
                type: 'addAttendee',
                id: this.currentBooking._id,
                name: this.name,
                age: this.age,
                shopItems: itemObj
            })        
            this.registered = false
        },
        printPDF(){
            let moneySpend = 8
            this.itemsObj.map(item => moneySpend+=item.price)
            PDF.print(this.currentBooking, this.theater, this.name, this.age, this.shopItems, moneySpend)
            this.$store.dispatch('fetchTheaters')
            this.$store.dispatch('fetchMovies')
            this.$store.dispatch('fetchAttendees')
            this.$store.dispatch('fetchShop')
            this.$emit('clearBooking')
        }
    }
    
}
</script>


<style lang="scss">
.overlay{
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    overflow: auto;
    z-index: 1;

    button{
        width:120px;
        height:40px;
        border-radius: 3px;
        margin: 0 auto;
        background-color:#23bfa3;
        font-size: 14px;
        color:whitesmoke;
        font-weight: 600;
        letter-spacing: 1px;
        margin-top: 40px;
        cursor: pointer;
    }
    .booking-container{
        padding: 50px;
        max-width:300px;
        margin: 150px auto;
        background-color: whitesmoke;

        .shop-tag{
            font-size: 20px;
            text-decoration: underline;
            margin-bottom: 12px;
        }
        
        .close {
            color: white;
            font-size: 24px;
            position: absolute;

            border-radius: 50px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            width: 25px;
            height: 25px;
            background: #23bfa3;
            margin-top: -80px;
            margin-left: 335px;
        }
        .checkboxes{
            display:flex;
            justify-content: space-around;
            .shop-grid{
                display: grid;
                grid-template-columns: 130px 130px;
                grid-gap: 10px 36px;
                label{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    input{
                        height: auto;
                        margin-left: 10px;
                        margin-bottom: 5px;
                    }
                }

            }
           
        }
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        h3{
            text-align: center;
            color:black;
        }
        form{
            display:flex;
            flex-direction: column;
            input{
                margin-bottom:20px;
                height: 30px;
                padding:13px 15px;
                font-size: 18px;
                border-radius: 4px;
                border: 1px solid #1d1d1d21;
                    font-weight: 300;
            }
        }
        .successful{
            font-size: 20px;
            font-weight: 600;
            text-align: center;
        }
    } 
}
</style>
