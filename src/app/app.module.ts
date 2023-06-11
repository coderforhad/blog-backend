import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonModule } from './person/person.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        // CHECK IF YOU GET WHAT IS EXPECTED
        // console.log('ENV VAR', ConfigService.get('DATABASE_URL'));

        const options: MongooseModuleOptions = {
          uri: ConfigService.get<string>('DATABASE_URL'),
        };

        return options;
      },
    }),
    ConfigModule.forRoot({
      cache: true,
    }),
    UserModule,
    PersonModule,
    CommonModule
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
