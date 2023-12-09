import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ERole } from '../role.enum';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({unique:true,type:'enum',enum:ERole})
  name: string;
  @OneToMany(() => User, user => user.roles)
  users: User[];
  
}