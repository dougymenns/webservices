const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Scores = sequelize.define("gss_scores", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  relevance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  business: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  team_id: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE,
  },
});

module.exports = Scores;
