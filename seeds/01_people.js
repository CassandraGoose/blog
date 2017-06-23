const bcrypt = require('bcryptjs')
const saltRounds = 10


exports.seed = function(knex, Promise) {
return knex.raw('delete from people; alter sequence people_id_seq restart with 4')
  .then(function () {
      const salt = bcrypt.genSaltSync(saltRounds)

      const somePeeps = [{
        id: 1,
        username: 'wellpoop',
        email: 'jim@jim.com',
        password: bcrypt.hashSync('password123', salt),
        tagline: "I am an avid memer and my friends don't like me. Also. I have a bad username.",
        photo_url: 'https://washington-org.s3.amazonaws.com/s3fs-public/styles/navigation_block/public/homepage_hero_shot_free_things_pandas_0.jpg?itok=23cgXDWj',
        friend1: 'noteableSlug',
        friend2: 'pringles'
      },
      {
        id: 2,
        username: 'notableSlug',
        email: 'jeffrey@j.com',
        password: bcrypt.hashSync('password123', salt),
        tagline: "I am notable but not actually a slug.",
        photo_url: 'https://washington-org.s3.amazonaws.com/s3fs-public/styles/navigation_block/public/homepage_hero_shot_free_things_pandas_0.jpg?itok=23cgXDWj',
        friend1: 'wellpoop',
        friend2: 'pringles'
      },
      {
        id: 3,
        username: 'pringles',
        email: 'jim@poop.com',
        password: bcrypt.hashSync('password123', salt),
        photo_url: 'https://washington-org.s3.amazonaws.com/s3fs-public/styles/navigation_block/public/homepage_hero_shot_free_things_pandas_0.jpg?itok=23cgXDWj',
        friend1: 'noteableSlug',
        friend2: 'wellpoop'
      }]
      return knex('people').insert(somePeeps)

    })
};
