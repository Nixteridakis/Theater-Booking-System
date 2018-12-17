const Shop = require ('./shop')

module.exports = class Person {
    constructor(name,age,id){
        this.name = name
        this.age = age
        this.shopped = []
    }

    static buyTicketFor(person,movie){
      movie.audience.push(person)
    }
  
    static shop(person,item){
      person.shopped.push(item)
    }

    static create({ name, age, id, shopped }){
      const newPerson = new Person(name,age,id)
      newPerson.shopped = shopped.map(Shop.create)
      return newPerson
    }
}

