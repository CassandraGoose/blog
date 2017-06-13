
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
  .then(function () {
    return knex('comment').insert([
      {
        id: 1,
        content: 'Firsties!',
        post_id: 1
      }]
    )
  })
};
