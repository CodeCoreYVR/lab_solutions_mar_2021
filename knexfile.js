// Update with your config settings.

module.exports = {

  development: {
    client: "pg",
    connection: {
      database: "note_saver"
    },
    migrations: {
      tableName: "migrations",
      directory: "./db/migrations"
    }
  }

};
