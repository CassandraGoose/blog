const knex = require('./knex'); // the connection!

module.exports = {
  getAll() {
    return knex('people');
  },
  getAllPosts() {
    return knex('post');
  },
  getAllComments() {
    return knex('comment')
  },
  getOne(id) {
    return knex('people').where('id', id).first();
  },
  create(person) {
    return knex('people').insert(person, '*');
  },
  createPost(post) {
    return knex('people').insert(person, '*');
  },
  createComment(comment) {
    return knex('comment').insert(comment, '*');
  },
  update(id, person) {
    return knex('people').where('id', id).update(person, '*');
  },
  delete(id) {
    return knex('people').where('id', id).del();
  }
}
