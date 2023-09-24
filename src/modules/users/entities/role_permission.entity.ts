import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Permission } from 'src/modules/users/entities/permission.entity';

@Entity({ name: 'role-permission' })
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role;
    

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission: Permission;
}
