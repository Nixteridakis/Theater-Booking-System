<template>
<div>
    <booking v-if="currentBooking.Name !== undefined" :currentBooking="currentBooking" @clearBooking="clear" :theater="theater"></booking>
    <div id="theater" v-if="theater !== undefined">
        <app-navbar></app-navbar>
        <header :style="{ backgroundImage: `url('${theater.image}')` }">
            <div class="theater-label">{{this.$route.params.name}}</div>
        </header>
        <main>
            <h2>Movies Playing</h2>
                <div id="movie-container">
                    <ul>
                    <li v-for="(movie,key) in theaterMovies" id ="movie-list" :key="key">
                        <div class="movie-img" :style="{ backgroundImage: `url('${movie.Poster}')` }"></div>
                        <div class="movie-info">
                            <div class="column1"><p>Name</p><p>Director</p><p>Year</p><p>Rating</p></div>
                            <div class="column2"><p>{{ movie.Name }}</p><p>{{ movie.Director }}</p> <p>{{ movie.Year }}</p><p>{{ movie.Rating }}</p></div>
                            <div class="column3">
                                <button @click="handleBooking($event,key)">Book A Ticket Now</button>
                                <div class="attendees-number">No: of attendees: {{ movie.attendees.length }}
                                    <div class="attendee-container">
                                        <ul>
                                            <li v-for="(attendee, key) in findAttendeesNames(movie.attendees)" :key="key"> {{ attendee }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    </ul>
                </div>
                <div class="totalSales">
                    <p>Total Theater Sales {{ totalGross }}</p>
                </div>
        </main>
    </div>
</div>
</template>
<script>
import Booking from '../components/Booking.vue'

export default {
    beforeMount(){
        this.clear
    },
    mounted(){
        this.itemSales
    },
    components:{
    'booking': Booking
    },
    data(){
        return {
            currentBooking : {},
            active: false,
            attendeesNum : 0,
            totalGross: 0
        }
    },
    methods: {
        handleBooking(event,i){
            this.currentBooking = this.theaterMovies[i]
        },
        findAttendeesNames(attendees){
            const attendeesName = attendees.map(x=> {
                const findStateName = this.$store.state.attendees.filter(y => {
                   return y._id == x
                })
                if (typeof findStateName[0] == 'object'){
                    return findStateName[0].name
                }
            })
            return attendeesName
        },
        clear(){
            this.currentBooking = {}
        }
    },
    computed:{
        theater(){
            const state_theaters = this.$store.state.theaters
            const curr_theater = typeof state_theaters[0] == 'object' ? state_theaters.filter(theater => theater.name ==  this.$route.params.name) : null
            const response = curr_theater !== null ? curr_theater[0] : undefined
            return response
        },
        theaterMovies(){
            const movies = this.theater !== undefined ? this.theater.movies : null
            return movies
        },
         itemSales(){
            let totalAttendees, totalMoney, attendeesItems
            totalAttendees = 0
            totalMoney = 0
            if (this.theaterMovies !== null){
                attendeesItems = this.theaterMovies.map(movie => {
                    const attendeeList = movie.attendees.map(attendeeId => {
                        const attendeeObj = this.$store.state.attendees.filter(x => x._id == attendeeId)
                        if (typeof attendeeObj[0] == 'object'){ 
                            return attendeeObj[0].shopped
                        }
                    })
                    return attendeeList
                })
            
                attendeesItems.map(personItems => {
                    personItems.map(item => {
                        if (typeof item == 'object'){
                            if(item.length > 0){
                                item.map(x =>{
                                    totalMoney += x.price
                                })
                            }
                        }
                    })
                    return
                })
                this.theaterMovies.map(x => {
                    totalAttendees+=x.attendees.length
                })
                let newAttendees = this.attendeesNum
                newAttendees = totalAttendees

                let newGross = this.totalGross
                newGross = totalMoney + (newAttendees * 8)

                this.totalGross = newGross
            }
            return totalMoney
        }
    }
}
</script>


<style lang="scss">

#theater{
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(1, minmax(500px,960px));        
    justify-content: center;
    color:white;

    header{
        height: 200px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        .theater-label{
            display: inline-flex;
            text-align:center;
            font-size:36px;
            background-color: #1b1b1b45;
            padding: 2px 20px;
            border-radius: 4px;
            margin-left: 50%;
            margin-top: 75px;
            transform: translateX(-50%);
            color: whitesmoke
        }
    }
    #movie-container{
        ul{
            padding:0px;
            
            #movie-list{
                display: flex;
                margin-bottom: 20px;

                .movie-img{
                    background-repeat: no-repeat;
                    height:268px;
                    width: 265px;
                }
                .movie-info{
                    width: 100%;
                    max-height: 228px;
                    padding: 20px;
                    background-color: #202020;
                
                    .column1{
                        float: left;
                        color: white;
                        margin-right: 15px;
                        }
                    .column2{
                        float: left;
                        color:#a28b53;
                    }
                    .column3{
                        margin-top: 10px;
                        margin-right: 20px;
                        float: right;

                        button{
                            background-color: black;
                            color: #a28b53;
                            padding: 9px 15px;
                            border-color: #a28b53;
                            border-radius: 3px;
                            font-size: 12px;
                            cursor: pointer;

                            &:hover{
                                border-color: whitesmoke;
                            }
                        }
                        .attendees-number{
                            margin-top: 11px;
                            margin-left: 14px;
                            cursor: pointer;
                            font-weight: 200;
                            font-size: 14px;
                            .attendee-container{
                                opacity: 0;
                                background-color: black;
                                color: #a28b53;
                                height: auto;
                                width: 100%;
                                text-align: center;
                                padding-top: 8px;
                                padding-bottom: 5px;
                                margin-top: 5px;
                                margin-left: -7px;
                                border-radius: 4px;
                                transition: opacity 0.4s ease-in-out;
                                ul{
                                    list-style-type: none;
                                }
                                li{
                                        padding-bottom: 4px;
                                }
                            }
                            &:hover{
                                .attendee-container{
                                        opacity: 1;
                                    }
                            }
                        }
                    }
                }
            }
        }
    }
    .totalSales{
        color: #a28b53;
        margin-top: 30px;
        margin-bottom: 20px;
        float: right;
    }
}
</style>
