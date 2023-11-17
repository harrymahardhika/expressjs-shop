const Sequelize = require('sequelize')
const process = require('process')
const path = require('path')
const fs = require('fs')

// Load the database configuration. The configuration file is a JavaScript
// file that exports an object with the configuration options.
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../../config/database.js')[env]

// Create a Sequelize instance, which is used to connect to the database
// and run queries.
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Define an empty object to hold the models for the application.
const db = {}

// Read the files in the current directory, which should be the models
// directory. For each file, create a model and add it to the db object.
fs.readdirSync(__dirname)
  .filter((file) => {
    // Only load JavaScript files that don't start with '.' and aren't
    // this file.
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach((file) => {
    // Create a model from the file and add it to the db object.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

// Associate the models with one another. This is necessary because the
// models can't be associated with one another until all of them have
// been defined. This is done in a separate step after the models are
// defined.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// Store the Sequelize instance and Sequelize constructor on the db
// object so they can be used later.
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
