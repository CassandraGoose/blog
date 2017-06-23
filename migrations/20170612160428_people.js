
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('people', function(table){
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('tagline')
    table.string('photo_url')
    table.string('friend1')
    table.string('friend2')
    table.string('friend3')
    table.string('friend4')
    table.string('friend5')
    table.string('friend6')
    table.string('friend7')
    table.string('friend8')
    table.string('friend9')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('people')
};
