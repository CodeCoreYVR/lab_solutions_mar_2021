const knexfile = require("../knexfile.js/index.js");
const knex = require("knex")(knexfile["development"]);

module.exports = knex;