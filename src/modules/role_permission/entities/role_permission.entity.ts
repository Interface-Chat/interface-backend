import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';

@Entity({ name: 'role-permission' })
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission: Permission;
}
