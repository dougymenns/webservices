const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Users = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,

    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        required: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }
})

module.exports = Users