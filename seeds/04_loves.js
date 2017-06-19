
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('loves').del()
    .then(function () {
      // Inserts seed entries
      return knex('loves').insert([
        {
          id: 1,
          date_loved: new Date(2004, 12, 17),
          post_id: 1,
          people_id: 1
        },
        {
          id: 2,
          date_loved: new Date(2017, 12, 17),
          post_id: 2,
          people_id: 2
        }
      ]);
    });
};
