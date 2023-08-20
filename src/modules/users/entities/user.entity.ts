import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  profile_img: string;
  
  
}