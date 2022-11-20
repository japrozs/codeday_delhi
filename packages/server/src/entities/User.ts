import { Field, ObjectType } from "type-graphql";
import { Service } from "./Service";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({
        default:
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    })
    imgUrl: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    phone: string;

    @Column()
    password!: string;

    @Field(() => [Service])
    @OneToMany(() => Service, (service) => service.creator)
    services: Service[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
