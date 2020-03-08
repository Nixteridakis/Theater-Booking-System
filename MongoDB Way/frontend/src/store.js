import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theaters:[],
    movies: [],
    attendees: [],
    shop: []
  },
  mutations: {
    registerTheaters(state, data){
      state.theaters = data
    },
    registerMovies(state, data){
      state.movies = data
    },
    registerAttendees(state, data){
      state.attendees = data
    },
    registerShop(state, data){
      state.shop = data
    }
  },
  actions: {
    async fetchTheaters({commit}){
      const theaters = await axios.get('http://localhost:3000/theaters')
      commit('registerTheaters', theaters.data)
    },
    async fetchMovies({commit}){
      const movies = await axios.get('http://localhost:3000/movies')
      commit('registerMovies', movies.data)
    },
    async fetchAttendees({commit}){
      const attendees = await axios.get('http://localhost:3000/people')
      commit('registerAttendees', attendees.data)
    },
    async fetchShop({commit}){
      const shop = await axios.get('http://localhost:3000/shop')
      commit('registerShop', shop.data)
    },
    async addAttendee({commit}, data ){
      const newPerson = await axios.post('http://localhost:3000/person',{name:data.name,age:data.age,shopped:[]});
      await axios.post(`http://localhost:3000/movie/${data.id}/addPerson`,{personId:newPerson.data._id})
      data.shopItems.map(async(item)=>{
        await axios.post(`http://localhost:3000/person/${newPerson.data._id}/add-item`,{itemId:item._id})
      });


    }
  }
})
