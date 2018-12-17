
module.exports = class Theater {
    constructor(name,totalSales,image){
      this.name = name
      this.totalSales = totalSales
      this.image =  image
      this.movies = []
    }
    
    static sales(Theater){
      console.log (chalk.blue(`The total sales of ${Theater.name} is $${Theater.totalSales}`))
    }

    static add(theater,price){
      theater.totalSales += price
    }
    
    static create({ name, totalSales }) {
      const newCinemas = new Theater(name)
      newCinemas.totalSales = totalSales
      return newCinemas
    }
  }
