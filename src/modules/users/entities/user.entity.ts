import { UserToTopic } from 'src/modules/user_to_topic/entities/user_to_topic.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert, BaseEntity, JoinTable, ManyToMany, AfterUpdate, Timestamp, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { UserTag } from 'src/modules/user_tag/entities/user_tag.entity';

@Entity({name: 'users'})
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) 
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  // @Column({select: false})
  @Column({})
  @Exclude()
  password: string;
  
  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  profile_img: string;
  

  @CreateDateColumn()
  CreateAT: Date;
  @UpdateDateColumn()
  UpdateAT:Date;

  @ManyToOne(() => Role, (role) => role.id,{cascade:true})
  role: Role;

  @OneToMany(() => UserToTopic, (userToTopic) => userToTopic.user)
  userToTopics: UserToTopic[];

  @OneToMany(() => UserTag, (userToTag) => userToTag.user)
  userToTag: UserTag[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
      this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
  }

  
  
}