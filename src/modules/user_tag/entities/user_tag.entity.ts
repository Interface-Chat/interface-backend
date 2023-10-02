import { Tag } from "src/modules/tags/entities/tag.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:'user_tag'})
export class UserTag {
 
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => User, (user) => user.userToTag)
    user: User;

    @ManyToOne(()=>Tag,(tag)=>tag.userToTag)
    tag:Tag;

    
}
