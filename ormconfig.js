const productionEnv = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
};

const developmentEnv = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
};

module.exports =
  process.env.NODE_ENV === 'production' ? productionEnv : developmentEnv;
