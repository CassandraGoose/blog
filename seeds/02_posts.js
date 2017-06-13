
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        {
          id: 1,
          s3_url: '',
          text: 'This is a text post.',
          loves: 1,
          hates: 2,
          date: new Date(2004, 12, 17),
          people_id: 1
        },
        {
          id: 2,
          s3_url: 'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg',
          text: '',
          loves: 1,
          hates: 55,
          date: new Date(2017, 12, 17),
          people_id: 1
        },
        {
          id: 3,
          s3_url: 'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg',
          text: 'this also has text',
          loves: 70,
          hates: 2,
          date: new Date(1991, 12, 17),
          people_id: 1
        }
      ]);
    });
};
