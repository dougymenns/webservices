const Sequelize = require('sequelize')

const sequelize = new Sequelize('xtra-cash', 'postgres', 'decoy', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 50000
    }
  });

  module.exports = sequelize

