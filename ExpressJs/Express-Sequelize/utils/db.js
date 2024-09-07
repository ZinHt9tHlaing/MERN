const Sequelize = require("sequelize")

const sequelize = new Sequelize("blog", "zhh", "asdffdsa", {
  host: "localhost",
  dialect: "mysql"
})

module.exports = sequelize