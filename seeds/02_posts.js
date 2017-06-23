
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('delete from post; alter sequence post_id_seq restart with 4')
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        {
          id: 1,
          s3_url: '',
          text: 'This is a text post.',
          loves: 1,
          hates: 2,
          people_id: 1
        },
        {
          id: 2,
          s3_url: 'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg',
          text: '',
          loves: 1,
          hates: 55,
          people_id: 2
        },
        {
          id: 3,
          s3_url: 'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg',
          text: 'this also has text',
          loves: 70,
          hates: 2,
          people_id: 3
        }
      ]);
    });
};
