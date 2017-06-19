
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('loves', function(table){
      table.increments('id').primary()
      table.date('date_loved')
      table.integer('post_id').unsigned().references('id').inTable('post').onDelete('CASCADE')
      table.integer('people_id').unsigned().references('id').inTable('people').onDelete('CASCADE')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('loves')
};
