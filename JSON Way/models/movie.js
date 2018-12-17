const Person = require('./person')

module.exports = class Movie{
    constructor(name,poster,year,rating,genre,director,price){
        this.Name = name
        this.Poster = poster
        this.Year = year
        this.Rating = rating
        this.Genre = genre
        this.Director = director
        this.price = price
        this.audience = []
        }
  
  static attendies(movie){
    let attendies = [];
    (movie.audience).forEach(function(x){
        attendies.push(x.name)
    })
    attendies =  attendies.reduce((accumulator, currentValue) => accumulator + "," + currentValue)
  }

  static create({ name, price, theater, audience}){
      const movie = new Movie( name, price)
      movie.audience = audience.map(Person.create)
      return movie
    }
}
