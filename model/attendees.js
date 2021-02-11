const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Attendees = sequelize.define('gss_attendees',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    full_name: {
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
    employed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        required: true
    },
    workplace: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    workplace_role: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    medium: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    come_along: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    people_along: {
        type: Sequelize.STRING,
        allowNull: true,
        required: false
    },
    expectation:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    // createdAt: {
    //     field: 'created_at',
    //     type: Sequelize.DATE,
    // },
    // updatedAt: {
    //     field: 'updated_at',
    //     type: Sequelize.DATE,
    // },
})

module.exports = Attendees