
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('post', function(table){
      table.increments('id').primary()
      table.string('s3_url')
      table.text('text')
      table.integer('loves')
      table.integer('hates')
      table.dateTime('created_at').defaultTo(knex.fn.now())
      table.integer('people_id').unsigned().references('id').inTable('people').onDelete('CASCADE');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('post')
};
