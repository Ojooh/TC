require('dotenv').config('../../.env');

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": 3306,
    "dialect": 'mysql',
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000,
    },
    "dialectOptions": {
      "bigNumberStrings": true,
    },
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
