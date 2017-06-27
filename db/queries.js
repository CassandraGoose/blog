const knex = require('./knex'); // the connection!

module.exports = {
  getAll() {
    return knex('people');
  },
  getAllPosts() {
    return knex('post');
  },
  getAllComments() {
    return knex('comment');
  },
  getPersonImage(people_id) {
    return knex('people').where('id', people_id);
  },
  getOne(id) {
    return knex('people').where('id', id).first();
  },
  getOneByEmail(email) {
    return knex('people').where('email', email).first()
  },
  getOneByUsername(username){
    return knex('people').where('username', username).first()
  },
  create(person) {
    return knex('people').insert(person, 'id').then(ids => {
      return ids[0]
    })
  },
  createPost(post) {
    return knex('post').insert(post, '*');
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
