
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('comment', function(table){
      table.increments().primary()
      table.text('content')
      table.integer('post_id').references('id').inTable('post').onDelete('cascade').notNull()
      table.dateTime('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('comment')
};
