import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize('test-db', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'sqlite',
  // 'storage' es la opcion correcta para SQLite (antes se usaba 'host', que se ignoraba)
  storage: process.env.DATABASE_NAME || ':memory:',
  logging: false
})

export default sequelize
