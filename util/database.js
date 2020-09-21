const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres', 'postgres', 'decoy', {
    host: 'localhost',
    dialect: 'postgres' 
  });

  module.exports = sequelize