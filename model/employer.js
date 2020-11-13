const Sequelize = require('sequelize')

const sequelize = require("../util/database")

const EmployerProfile = sequelize.define('employer_profiles',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    years_of_existence: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    about: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    profile_picture: {
        type: Sequelize.STRING,
        allowNull: true,
        required: false,
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

module.exports = EmployerProfile