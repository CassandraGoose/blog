const knex = require('./knex'); // the connection!

module.exports = {
  getAll() {
    return knex('people');
  },
  getOne(id) {
    return knex('people').where('id', id).first();
  },
  create(person) {
    return knex('people').insert(person, '*');
  },
  update(id, person) {
    return knex('people').where('id', id).update(person, '*');
  },
  delete(id) {
    return knex('people').where('id', id).del();
  }
}
