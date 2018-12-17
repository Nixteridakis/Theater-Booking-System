module.exports = class Shop{
  constructor(name,price){
      this.name = name
      this.price = price
  }
  
  static create({ name, price}){
      return new Shop (name, price)
  }
}

