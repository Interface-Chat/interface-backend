import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User} from '../typeorm/entities/User';
import { User} from '../modules/users/entities/user.entity';
import { join } from 'path';


const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost', // Your MySQL host
  port: 3306, // Your MySQL port
  username: 'root',
  password: '',
  database: 'interface',
  entities: [join(__dirname, '../modules/**/entities/*.entity{.ts,.js}')], // Dynamic import
  // entities: [User],
  synchronize: true, // Automatically create database schema on application start (for development)
};

export default databaseConfig;