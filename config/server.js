module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1440),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '5d65080089dadbaf0cb526b82f98a453'),
    },
  },
});
