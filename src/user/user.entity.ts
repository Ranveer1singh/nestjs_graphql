import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType() // Expose the entity as a GraphQL object type
@Entity('users') // Name of the database table
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int) // Expose this field in the GraphQL schema
    id: number;

    @Column({ unique: true })
    @Field() // Expose this field in the GraphQL schema
    email: string;

    @Column()
    @Field() // Expose this field in the GraphQL schema
    password: string; // The hashed password
}
