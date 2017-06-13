const knex = require('./knex'); // the connection!

module.exports = {
  getAll() {
    return knex('user');
  },
  getOne(id) {
    return knex('user').where('id', id).first();
  },
  create(user) {
    return knex('user').insert(user, '*');
  },
  update(id, user) {
    return knex('user').where('id', id).update(user, '*');
  },
  delete(id) {
    return knex('user').where('id', id).del();
  }
}
