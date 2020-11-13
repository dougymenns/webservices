const Sequelize = require('sequelize')

const sequelize = require("../util/database")

const PostJobs = sequelize.define('post_jobs',{
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
    job_title: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    job_description: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    file: {
        type: Sequelize.STRING,
        allowNull: true,
        required: false
    },
    work_done: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    amount: {
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

module.exports = PostJobs