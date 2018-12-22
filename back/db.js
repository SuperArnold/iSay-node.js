var Sequelize = require('sequelize');

module.exports = new Sequelize('isay', 'postgres', 'p@ssw0rd', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    });
 
