// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/blog'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
}
};
