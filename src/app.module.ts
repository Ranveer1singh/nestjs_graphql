import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataSource } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Specify the driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generate schema
      playground: true, // Enable GraphQL Playground (optional)
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:"localhost",
      port:3306,
      username:"root",
      password:"",
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
// export class AppModule implements OnModuleInit{
//   constructor(private readonly dataSource : DataSource){}

//   async onModuleInit() {
//     try {
//       await this.dataSource.initialize();
//       console.log("Data base connection successfull")
//     } catch (error) {
//       console.log('Database connection failed', error.message);
//     }
//   }
// }
