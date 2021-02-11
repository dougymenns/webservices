const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize('xtra-cash', 'postgres', 'decoy', {
    host:'localhost',
    dialect: 'postgres' ,
    // define: {
    //   timestamps: false
    // },
  });

  module.exports = sequelize