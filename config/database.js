module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '185.53.59.4'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'nonstopplccom_Rental'),
        username: env('DATABASE_USERNAME', 'nonstopplccom_rental'),
        password: env('DATABASE_PASSWORD', 'password2020'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
