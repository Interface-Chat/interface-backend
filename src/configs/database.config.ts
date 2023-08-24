import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User} from '../typeorm/entities/User';
import { User} from '../modules/users/entities/user.entity';
import { join } from 'path';


const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  // host: '127.0.0.1', 
  // port: 3306, 
  // username: 'root',
  // password: '',
  // database: 'interface',
  host: 'dev.seksa.today', // Your MySQL host
  port: 3306, // Your MySQL port
  username: 'interface_chat_dev',
  password: 'zEQY0d7C2e_1',
  database: 'interface_chat_dev01',
  entities: [join(__dirname, '../modules/**/entities/*.entity{.ts,.js}')], // Dynamic import
  // entities: [User],
  synchronize: true, // Automatically create database schema on application start (for development)
};

export default databaseConfig;