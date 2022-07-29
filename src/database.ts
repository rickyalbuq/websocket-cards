import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'db',
  'admin',
  'pass',
  {
    dialect: 'sqlite',
    storage: './db.sqlite',
    define: {
      freezeTableName: true
    }
  },
);

export default sequelize;
