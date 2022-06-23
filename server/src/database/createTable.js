const database = require('./index')

async function run() {
  await database.schema.createTable('calculations', table => {
    table.increments('id')
    table.string('result')
    table.string('expression')
    table.string('ip')
    table.datetime('created_at', { precision: 6 }).defaultTo(database.fn.now(6))
  })

  console.log('table created with sucessfully')
}

run()
