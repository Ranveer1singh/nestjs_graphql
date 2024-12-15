import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Specify the driver
      autoSchemaFile: true, // Automatically generate schema
      playground: true, // Enable GraphQL Playground (optional)
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:"localhost",
      port:3306,
      username:"root",
      password:"Root@123",
      database:"auth_db",
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true // use only in dev not in production

    }),
    UserModule,
    
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
