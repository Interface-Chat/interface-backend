import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './controllers/roles.controller';

@Module({
  
    imports:[
        TypeOrmModule.forFeature(
          [Role]
        )
      ],
    controllers:[RolesController],
    providers:[RoleService],
    exports: [RoleService],
})
export class RolesModule {}
