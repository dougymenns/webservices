const Sequelize = require('sequelize')

const sequelize = require("../util/database")

const FreelancerProfile = sequelize.define('freelancer_profile',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    expertise: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    level_of_expertise: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    other_skills: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    about: {
        type:Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    picture:{
        type: Sequelize.STRING,
        allowNull: true,
        required: false
    },
    resume:{
        type: Sequelize.STRING,
        allowNull: true,
        required: false
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

module.exports = FreelancerProfile