const { Sequelize, DataTypes } = require('sequelize');
console.log(process.env.DB_URL,"process.env.DB_URL")
const databaseUrl = process.env.DB_URL 
// || 'postgres://developer:developer@localhost:5432/postgres'
console.log("====>",databaseUrl)
const sequelize = new Sequelize(databaseUrl,{
  dialect: 'postgres',
});

const Candidate = sequelize.define('candidate', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  skills: DataTypes.TEXT,
  status: DataTypes.STRING,
  expected_salary: DataTypes.NUMERIC,
  node_experience: DataTypes.NUMERIC,
  react_experience: DataTypes.NUMERIC,
  total_score: DataTypes.NUMERIC,
},{
  timestamps:true
});

module.exports = { Candidate, sequelize };
