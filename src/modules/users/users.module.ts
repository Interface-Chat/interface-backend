import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { AdminController } from './controllers/admin.controller';
import { UploadFileModule } from '../uploadfile/upload_file.module';

@Module({
  imports:[
    UploadFileModule,
    RolesModule,
    TypeOrmModule.forFeature(
      [User,Role]
    )
  ],

  controllers: [UsersController,AdminController],
  providers: [UsersService],
  exports:[UsersService],
})
export class UsersModule {}
