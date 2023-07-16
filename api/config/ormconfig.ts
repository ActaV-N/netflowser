const mysqlConfig = {
  type: 'mysql',
  host: { $env: 'DB_HOST' },
  port: { $env: 'DB_PORT' },
  database: { $env: 'DB_NAME' },
  username: { $env: 'DB_USER' },
  password: { $env: 'DB_PASSWORD' },
  timezone: 'UTC+0',
};

export default {
  $filter: { $env: 'NODE_ENV' },
  production: {
    ...mysqlConfig,
    synchronize: false,
    logging: true,
    // migrations: ['src/migration/**/*.ts'],
    supportBigNumbers: true,
    bigNumberStrings: false,
  },
  stage: {
    ...mysqlConfig,
    synchronize: true,
    logging: true,
    // migrations: ['src/migration/**/*.ts'],
    supportBigNumbers: true,
    bigNumberStrings: false,
    extra: {
      connectionLimit: 2,
    },
  },
  $default: {
    ...mysqlConfig,
    synchronize: false,
    logging: true,
    // migrations: ['src/migration/**/*.ts'],
    supportBigNumbers: true,
    bigNumberStrings: false,
  },
};
