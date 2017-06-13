
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('people', function(table){
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('photo_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('people')
};
