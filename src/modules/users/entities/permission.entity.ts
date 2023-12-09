import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permission' })
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    code: string;
}
