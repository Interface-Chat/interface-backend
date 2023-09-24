import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature(
          [Role]
        )
      ],
    providers:[RoleService],
    exports: [RoleService],
})
export class RolesModule {}
