
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BaseEntity } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcryptjs';

@Entity({name: 'users'})
export class User extends BaseEntity{
  // static findOne(arg0: { where: { email: string; }; }) {
  //   throw new Error('Method not implemented.');
  // }
  // save() {
  //   throw new Error('Method not implemented.');
  // }
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

  @Column()
  CreateAT: Date;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  profile_img: string;


  @BeforeInsert()
  async hashPassword(): Promise<void> {
      this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
  }

  
  
}