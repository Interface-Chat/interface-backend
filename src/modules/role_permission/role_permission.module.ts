import { Module } from '@nestjs/common';
import { RolePermissionService } from './services/role_permission.service';
import { RolePermissionController } from './controllers/role_permission.controller';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
