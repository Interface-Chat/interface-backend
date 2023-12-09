import { UserTag } from "src/modules/user_tag/entities/user_tag.entity";
import { TagTopic } from "src/modules/tag_topic/entities/tag_topic.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tag'})
export class Tag {
    
    @PrimaryGeneratedColumn()
    id:number;

    //name have only one
    @Column({unique:true})
    name:string;

    @OneToMany(() => UserTag, (userToTag) => userToTag.tag)
    userToTag: UserTag[];

    @OneToMany(() => TagTopic, (tagToTopics) => tagToTopics.tag)
    tagToTopics: TagTopic[];
   

   
}
