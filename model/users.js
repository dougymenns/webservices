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
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    user_type: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
})

module.exports = Users